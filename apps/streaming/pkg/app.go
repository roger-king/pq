package app

import (
	"fmt"
	"log"
	"net"
	"os"

	"github.com/roger-king/pq/streaming/pkg/server"
	"google.golang.org/grpc"
	glog "google.golang.org/grpc/grpclog"
)

var grpcLog glog.LoggerV2

func init() {
	grpcLog = glog.NewLoggerV2(os.Stdout, os.Stdout, os.Stdout)
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
	liveServer := server.NewLiveServer()
	server.RegisterBroadcastServer(s, liveServer)

	go liveServer.AuditConnections()

	return lis, s
}
