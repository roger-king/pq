package app

import (
	"fmt"
	"log"
	"net"

	"github.com/roger-king/pq/streaming/pkg/server"
	"google.golang.org/grpc"
)

type timerServer struct{}

func (*timerServer) Start(req *server.TimerRequest, stream server.Timer_StartServer) error {
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
	server.RegisterTimerServer(s, &timerServer{})

	return lis, s
}