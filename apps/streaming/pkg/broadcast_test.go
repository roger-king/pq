package app

import (
	"context"
	"log"
	"net"
	"testing"

	"github.com/roger-king/pq/streaming/pkg/server"
	"github.com/stretchr/testify/require"
	"github.com/stretchr/testify/suite"
	"google.golang.org/grpc"
	"google.golang.org/grpc/test/bufconn"
)

const bufSize = 1024 * 1024

var lis *bufconn.Listener

func bufDialer(context.Context, string) (net.Conn, error) {
    return lis.Dial()
}

type LiveServerSuite struct {
	suite.Suite

	server *LiveServer
	conn *grpc.ClientConn
	ctx context.Context
}

func (s *LiveServerSuite) SetupTest() {
	ctx := context.Background()
	s.ctx = ctx
	s.server = NewLiveServer()
	lis = bufconn.Listen(bufSize)
	sg := grpc.NewServer()
	server.RegisterBroadcastServer(sg, s.server)
	c, _ := grpc.DialContext(s.ctx, "bufnet", grpc.WithContextDialer(bufDialer), grpc.WithInsecure())
	s.conn = c
    go func() {
        if err := sg.Serve(lis); err != nil {
            log.Fatalf("Server exited with error: %v", err)
        }
    }()
}

func (s *LiveServerSuite) TestCreateStream_Success() {
    defer s.conn.Close()
    client := server.NewBroadcastClient(s.conn)
    _, err := client.CreateStream(s.ctx, &server.Connection{
		GameId: "TESTINGID123",
		User: &server.User{
			Id: "useridofauser",
			DisplayName: "Testing User",
			IsHost: false,
		},
		Active: true,
	})
	require.NoError(s.T(), err, "No error making create stream request")
}


func TestConnectionPoolSuite(t *testing.T) {
	suite.Run(t, new(LiveServerSuite))
}