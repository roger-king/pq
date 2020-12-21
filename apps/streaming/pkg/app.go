package app

import (
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
	active bool
	isHost bool
	error  chan error
}
type broadcastServer struct {
	Connections []*Connection
}

func (s *broadcastServer) CreateStream(req *server.Connection, stream server.Broadcast_CreateStreamServer) error {
	conn := &Connection{
		stream: stream,
		gameID: req.GameId,
		isHost: req.User.IsHost,
		active: true,
		error:  make(chan error),
	}

	log.Printf("User is connected: %s", req.User.DisplayName)

	s.Connections = append(s.Connections, conn)
	err := stream.Send(&server.Message{})

	if err != nil {
		return err
	}

	return <-conn.error
}

func (s *broadcastServer) StartTimer(req *server.TimerRequest, stream server.Broadcast_StartTimerServer) error {
	wait := sync.WaitGroup{}
	done := make(chan int)

	for _, conn := range s.Connections {
		wait.Add(1)
		log.Print(conn.stream)
		go func(req *server.TimerRequest, stream server.Broadcast_StartTimerServer) {
			defer wait.Done()
			log.Printf("Starting counddown: %v", conn.gameID)
			if conn.active && req.GameId == conn.gameID  {

				countdown := 60

				for countdown != 0 {
					countdown--
					time.Sleep(time.Second * 1)
					
					// if !req.IsHost {
					// 	err := stream.Send(&server.Countdown{Time: int64(countdown)})
						
					// 	if err != nil {
					// 		fmt.Errorf("Failed to send countdown: %v", err)
					// 	}
					// }
					 // TODO: look into a better way than using a global message.
					 err := conn.stream.Send(&server.Message{Time: int64(countdown)})
					 if req.IsHost {
						// ToDO: look into why the connection stream doesnt send to the host too.
						stream.Send(&server.Countdown{Time: int64(countdown)})
					 }

					 if err != nil {
						 fmt.Errorf("Failed to send countdown: %v", err)
					 }
				}
			}
		}(req, stream)

	}

	go func() {
		wait.Wait()
		close(done)
	}()

	<-done
	return nil
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