package app

import (
	"fmt"
	"log"
	"net"
	"time"

	"github.com/roger-king/pq/streaming/pkg/server"
	"google.golang.org/grpc"
)


type Connection struct {
	stream server.Broadcast_CreateStreamServer
	id     string
	active bool
	error  chan error
}
type broadcastServer struct {
	Connections []*Connection
}

func (s *broadcastServer) CreateStream(req *server.Connection, stream server.Broadcast_CreateStreamServer) error {
	conn := &Connection{
		stream: stream,
		id:     req.User.Id,
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

func (*broadcastServer) StartTimer(req *server.TimerRequest, stream server.Broadcast_StartTimerServer) error {
	log.Print("Got a start")
	countdown := 60

	for countdown != 0 {
		countdown--
		log.Printf("Starting counddown: %v", countdown)
		time.Sleep(time.Second * 1)

		err := stream.Send(&server.Countdown{Time: int64(countdown)})

		if err != nil {
			fmt.Errorf("Failed to send countdown: %v", err)
		}
	}

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