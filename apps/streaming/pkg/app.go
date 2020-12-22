package app

import (
	"context"
	"fmt"
	"log"
	"net"
	"os"
	"sync"
	"time"

	"github.com/roger-king/pq/streaming/pkg/server"
	"google.golang.org/grpc"
	glog "google.golang.org/grpc/grpclog"
)

var grpcLog glog.LoggerV2

func init() {
	grpcLog = glog.NewLoggerV2(os.Stdout, os.Stdout, os.Stdout)
}

type Connection struct {
	stream server.Broadcast_CreateStreamServer
	gameID string
	userID string
	active bool
	lastConnected int64
	isHost bool
	error  chan error
}
type broadcastServer struct {
	Connections map[string][]*Connection
}

// TODO: add a remove connection
func (s *broadcastServer) CreateStream(req *server.Connection, stream server.Broadcast_CreateStreamServer) error {
	now := time.Now() 
	conn := &Connection{
		stream: stream,
		gameID: req.GameId,
		userID: req.User.Id,
		isHost: req.User.IsHost,
		lastConnected: now.Unix(),
		active: true,
		error:  make(chan error),
	}

	log.Printf("User is connected: %s", req.User.DisplayName)
	if currentConns, ok := s.Connections[req.GameId]; ok {
		s.Connections[req.GameId] = append(currentConns, conn)
	} else {
		s.Connections = make(map[string][]*Connection)
		s.Connections[req.GameId] = []*Connection{conn}
	}

	err := stream.Send(&server.Message{})

	if err != nil {
		return err
	}

	return <-conn.error
}

func (s *broadcastServer) Start(req *server.StartQuestion, stream server.Broadcast_StartServer) error {
	wait := sync.WaitGroup{}
	done := make(chan int)

	if conns, ok := s.Connections[req.GameId]; ok {
		for _, conn := range conns {
			wait.Add(1)
			go func(req *server.StartQuestion, stream server.Broadcast_StartServer) {
				defer wait.Done()
				log.Printf("Starting counddown: %v", conn.userID)
				if req.GameId == conn.gameID  {
	
					countdown := 60
					// Send question to players
					err := conn.stream.Send(&server.Message{Question: req.Question})
					if err != nil {
						fmt.Errorf("Failed to send question: %v", err)
					}
					
					// Starting countdown
					for countdown != 0 {
						countdown--
						time.Sleep(time.Second * 1)
						
						 // TODO: look into a better way than using a global message.
						err := conn.stream.Send(&server.Message{Time: int64(countdown)})
						if req.IsHost {
							// ToDO: look into why the connection stream doesnt send to the host too.
							stream.Send(&server.Message{Time: int64(countdown)})
						}

						if err != nil {
							fmt.Errorf("Failed to send countdown: %v", err)
						}
					}
				}
			}(req, stream)
	
		}
	}

	go func() {
		wait.Wait()
		close(done)
	}()

	<-done
	return nil
}

func removeConnection(conns []*Connection, id int) []*Connection {
	conns[id] = conns[len(conns)-1] // Copy last element to index i.
	conns[len(conns)-1] = nil
	return conns[:len(conns)-1]
}

func (s *broadcastServer) Disconnect(ctx context.Context, conn *server.Connection) (*server.DisconnectResponse, error) {
	log.Print("Disconnecting User:")
	var connToRemove int
	connections := s.Connections[conn.GameId]
	for i, c := range connections {
		if c.userID == conn.User.Id {
			connToRemove = i;
			break;
		}
	}

	s.Connections[conn.GameId] = removeConnection(connections, connToRemove)

	log.Print(s.Connections[conn.GameId])
	return &server.DisconnectResponse{}, nil
}


// AuditConnections - audits the active connections
// Client should be sending a heartbeat request every 3 seconds.
func (s *broadcastServer) AuditConnections() {
	log.Print("Auditing connections started...")
	for {
		if len(s.Connections) > 0 {
			time.Sleep(time.Second * 10)
			for key, conns := range s.Connections {
				for i, c := range conns {
					now := time.Now().Unix()
					// We give a grace period of 15 seconds for the user.
					if c.lastConnected + 15 < now {
						log.Printf("%s is inactive.", c.userID)
						s.Connections[key] = removeConnection(conns, i)
					}
				}
			}
		}
	}
}


func (s *broadcastServer) Heartbeat(ctx context.Context, conn *server.Connection) (*server.HeartbeatResponse, error) {
	log.Printf("Heartbeat from user: %s", conn.User.DisplayName)
	didUpdate := false
	connections := s.Connections[conn.GameId]
	for _, c := range connections {
		if c.userID == conn.User.Id {
			didUpdate = true
			c.lastConnected = time.Now().Unix()
			break;
		}
	}

	if didUpdate {
		s.Connections[conn.GameId] = connections
	}
	log.Print(s.Connections[conn.GameId])
	return &server.HeartbeatResponse{}, nil
}

// App -
type App struct {
	Port string
}

// Start -
func (a *App) Start() (net.Listener, *grpc.Server) {
	lis, err := net.Listen("tcp", fmt.Sprintf("0.0.0.0:%s", a.Port))

	if err != nil {
		log.Fatalf("Error while listening: %v", err)
	}

	s := grpc.NewServer()
	broadcaster := &broadcastServer{}
	server.RegisterBroadcastServer(s, broadcaster)

	go broadcaster.AuditConnections()

	return lis, s
}
