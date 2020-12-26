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
	displayName string
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
		displayName: req.User.DisplayName,
		isHost: req.User.IsHost,
		lastConnected: now.Unix(),
		active: true,
		error:  make(chan error),
	}

	if currentConns, ok := s.Connections[req.GameId]; ok {
		alreadyConnected := false
		for i, c := range currentConns {
			if c.userID == req.User.Id {
				alreadyConnected = true;
				s.Connections[req.GameId][i].lastConnected = now.Unix() 
			}

			if c.isHost {
				log.Print("Sending new player")
				c.stream.Send(&server.Message{NewPlayer: &server.User{Id: conn.userID, DisplayName: conn.displayName, IsHost: false}})
			}
		}

		if !alreadyConnected {
			log.Printf("User is connected: %s", conn.displayName)
			s.Connections[req.GameId] = append(currentConns, conn)
		}
	} else {
		s.Connections = make(map[string][]*Connection)
		log.Printf("User is connected: %s", conn.displayName)
		s.Connections[req.GameId] = []*Connection{conn}
	}

	err := stream.Send(&server.Message{Time: int64(60), NewPlayer: nil, RemovedPlayer: nil, Question: nil})

	if err != nil {
		return err
	}

	return <-conn.error
}

func (s *broadcastServer) Start(req *server.StartQuestion, stream server.Broadcast_StartServer) error {
	wait := sync.WaitGroup{}
	done := make(chan int)

	if conns, ok := s.Connections[req.GameId]; ok {
		log.Print(len(conns))
		for _, conn := range conns {
			wait.Add(1)
			go func(req *server.StartQuestion, stream server.Broadcast_StartServer) {
				defer wait.Done()
				log.Printf("Starting counddown: %v", conn.userID)
				if req.GameId == conn.gameID  {
	
					countdown := 10
					// Send question to players
					err := conn.stream.Send(&server.Message{Question: req.Question, Time: int64(countdown)})
					if err != nil {
						fmt.Errorf("Failed to send question: %v", err)
					}
					
					// Starting countdown
					for countdown != 0 {
						countdown--
						time.Sleep(time.Second * 1)
						
						 // TODO: look into a better way than using a global message.
						err := conn.stream.Send(&server.Message{Time: int64(countdown), Question: req.Question})
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

func (s *broadcastServer) End(req *server.EndGame, stream server.Broadcast_EndServer) error {
	wait := sync.WaitGroup{}
	done := make(chan int)

	if conns, ok := s.Connections[req.GameId]; ok {
		log.Print(len(conns))
		for _, conn := range conns {
			wait.Add(1)
			go func(req *server.EndGame, stream server.Broadcast_EndServer) {
				defer wait.Done()
				log.Printf("Starting counddown: %v", conn.userID)
				if req.GameId == conn.gameID  {
					err := conn.stream.Send(&server.Message{End: true})
					if err != nil {
						fmt.Errorf("Failed to send question: %v", err)
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

	if len(conns) > 0 {
		conns[id] = conns[len(conns)-1] // Copy last element to index i.
		conns[len(conns)-1] = nil
		return conns[:len(conns)-1]
	}

	return conns
}

func(s *broadcastServer) getGameConnections(gameID string) []*Connection {
	return s.Connections[gameID]
}

func (s *broadcastServer) Disconnect(ctx context.Context, conn *server.Connection) (*server.DisconnectResponse, error) {
	var connToRemove int
	connections := s.Connections[conn.GameId]

	if len(connections) > 0 {
		log.Print("Disconnecting User:")
		for i, c := range connections {
			if c.userID == conn.User.Id {
				connToRemove = i;
			}
		}
	
		s.Connections[conn.GameId] = removeConnection(connections, connToRemove)
	}

	return &server.DisconnectResponse{}, nil
}


// AuditConnections - audits the active connections
// Client should be sending a heartbeat request every 3 seconds.
func (s *broadcastServer) AuditConnections() {
	log.Print("Auditing connections started...")
	wait := sync.WaitGroup{}
	for {
		if len(s.Connections) > 0 {
			time.Sleep(time.Second * 5)
			for key, conns := range s.Connections {
				wait.Add(1)
				go func (gameID string, connections []*Connection) {
					defer wait.Done()
					idsToRemove := []int{}
					var hostStream server.Broadcast_CreateStreamServer
					for i, c := range connections {
						now := time.Now().Unix()
						// We give a grace period of 15 seconds for the user.
						if c.lastConnected + 15 < now {
							log.Printf("%s is inactive.", c.userID)
							idsToRemove = append(idsToRemove, i);
						}
	
						if c.isHost {
							hostStream = c.stream
						}
					}
	
					for _, id := range idsToRemove {
						if hostStream != nil {
							log.Print("Sending to host")
							hostStream.Send(&server.Message{RemovedPlayer: &server.User{Id: s.Connections[gameID][id].userID}})
						}
						s.Connections[gameID] = removeConnection(s.Connections[gameID], id)
					}
	
					if len(idsToRemove) > 0 {
						idsToRemove = []int{}
					}
				}(key, conns)

			}
		}
	}
}


func (s *broadcastServer) Heartbeat(ctx context.Context, conn *server.Connection) (*server.HeartbeatResponse, error) {
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

	return &server.HeartbeatResponse{}, nil
}

func (s *broadcastServer) GetPlayerList(ctx context.Context, req *server.PlayerlistRequest) (*server.PlayerListResponse, error) {
	var playerList server.PlayerListResponse
	connections := s.Connections[req.GameId]
	for _, c := range connections {
		playerList.Players = append(playerList.Players, &server.User{
			DisplayName: c.displayName,
			Id: c.userID,
			IsHost: c.isHost,
		})
	}

	return &playerList, nil
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
