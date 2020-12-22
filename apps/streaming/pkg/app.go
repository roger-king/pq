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
	isHost bool
	error  chan error
}
type broadcastServer struct {
	Connections map[string][]*Connection
}

// TODO: add a remove connection
func (s *broadcastServer) CreateStream(req *server.Connection, stream server.Broadcast_CreateStreamServer) error {
	conn := &Connection{
		stream: stream,
		gameID: req.GameId,
		userID: req.User.Id,
		isHost: req.User.IsHost,
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

	connections[connToRemove] = connections[len(connections)-1] // Copy last element to index i.
	connections[len(connections)-1] = nil
	s.Connections[conn.GameId] = connections[:len(connections)-1]

	log.Print(s.Connections[conn.GameId])
	return &server.DisconnectResponse{}, nil
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
	server.RegisterBroadcastServer(s, &broadcastServer{})

	return lis, s
}




// func (s *broadcastServer) StartTimer(req *server.TimerRequest, stream server.Broadcast_StartTimerServer) error {
// 	wait := sync.WaitGroup{}
// 	done := make(chan int)

// 	if conns, ok := s.Connections[req.GameId]; ok {
// 		for _, conn := range conns {
// 			wait.Add(1)
// 			go func(req *server.TimerRequest, stream server.Broadcast_StartTimerServer) {
// 				defer wait.Done()
// 				log.Printf("Starting counddown: %v", conn.userID)
// 				if req.GameId == conn.gameID  {
	
// 					countdown := 60
	
// 					for countdown != 0 {
// 						countdown--
// 						time.Sleep(time.Second * 1)
						
// 						 // TODO: look into a better way than using a global message.
// 						err := conn.stream.Send(&server.Message{Time: int64(countdown)})
// 						if req.IsHost {
// 							// ToDO: look into why the connection stream doesnt send to the host too.
// 							stream.Send(&server.Countdown{Time: int64(countdown)})
// 						}

// 						if err != nil {
// 							fmt.Errorf("Failed to send countdown: %v", err)
// 						}
// 					}
// 				}
// 			}(req, stream)
	
// 		}
// 	}

// 	go func() {
// 		wait.Wait()
// 		close(done)
// 	}()

// 	<-done
// 	return nil
// }

// func (s *broadcastServer) NextQuestion(req *server.Question, stream server.Broadcast_NextQuestionServer) error {
// 	wait := sync.WaitGroup{}
// 	done := make(chan int)

// 	if conns, ok := s.Connections[req.GameId]; ok {
// 		log.Print(len(conns))
// 		for _, conn := range conns {
// 			wait.Add(1)
// 			go func(req *server.Question, stream server.Broadcast_NextQuestionServer) {
// 				defer wait.Done()
// 				if !conn.isHost && req.GameId == conn.gameID  {
// 					log.Printf("Sending question to: ", conn.userID)
// 					err := conn.stream.Send(&server.Message{Question: &server.Question{
// 						Q: req.Q,
// 						Options: req.Options,
// 					}})

// 					if err != nil {
// 						fmt.Errorf("Failed to send countdown: %v", err)
// 					}
// 				}
// 			}(req, stream)

// 		}
// 	}

// 	go func() {
// 		wait.Wait()
// 		close(done)
// 	}()

// 	<-done
// 	return nil
// }