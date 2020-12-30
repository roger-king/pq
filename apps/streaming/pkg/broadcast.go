package app

// TODO: look into making the core logic a separate file.

import (
	"context"
	"fmt"
	"log"
	"sync"
	"time"

	"github.com/roger-king/pq/streaming/pkg/models"
	"github.com/roger-king/pq/streaming/pkg/server"
	"github.com/roger-king/pq/streaming/pkg/services"
)

// LiveServer -
type LiveServer struct {
	Connections map[string]services.ConnectionPool
}

// NewLiveServer -
func NewLiveServer() *LiveServer {
	return &LiveServer{}
}

// CreateStream -
func (s *LiveServer) CreateStream(req *server.Connection, stream server.Broadcast_CreateStreamServer) error {
	now := time.Now() 
	conn := &models.UserConnection{
		ID: req.User.Id,
		Stream: stream,
		GameID: req.GameId,
		DisplayName: req.User.DisplayName,
		IsHost: req.User.IsHost,
		LastConnected: now.Unix(),
		Active: true,
		Error:  make(chan error),
	}

	if pool, ok := s.Connections[req.GameId]; ok {
		log.Printf("Found Connection %v", pool)
		alreadyConnected := false
		connections := pool.All()
		for _, c := range connections {
			if c.ID == req.User.Id {
				alreadyConnected = true;
				c.SetLastConnected(now)
			}

			if c.IsHost {
				log.Print("Sending new player")
				c.Stream.Send(&server.Message{Time: int64(60), NewPlayer: &server.User{Id: conn.ID, DisplayName: conn.DisplayName, IsHost: false}})
			}
		}

		if !alreadyConnected {
			log.Printf("User is connected: %s", conn.DisplayName)
			s.Connections[req.GameId].Add(conn)
		}
	} else {
		log.Printf("User is connected: %s", conn.DisplayName)
		s.Connections = map[string]services.ConnectionPool{
			req.GameId: services.NewUserConnectionPool(),
		}
		s.Connections[req.GameId].Add(conn)
	}

	// Send to 
	err := stream.Send(&server.Message{Time: int64(60), NewPlayer: nil, RemovedPlayer: nil, Question: nil})

	if err != nil {
		return err
	}

	return <-conn.Error
}

// Start -
func (s *LiveServer) Start(req *server.StartQuestion, stream server.Broadcast_StartServer) error {
	wait := sync.WaitGroup{}
	done := make(chan int)

	if pool, ok := s.Connections[req.GameId]; ok {
		for _, conn := range pool.All() {
			wait.Add(1)
			go func(req *server.StartQuestion, stream server.Broadcast_StartServer) {
				defer wait.Done()
				log.Printf("Starting counddown: %v", conn.ID)
				if req.GameId == conn.GameID && conn.Active  {
	
					countdown := 10
					// Send question to players
					err := conn.Stream.Send(&server.Message{Question: req.Question, Time: int64(countdown)})
					if err != nil {
						fmt.Errorf("Failed to send question: %v", err)
					}
					
					// Starting countdown
					for countdown != 0 {
						countdown--
						time.Sleep(time.Second * 1)
						
						err := conn.Stream.Send(&server.Message{Time: int64(countdown), Question: req.Question})
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

// End -
func (s *LiveServer) End(req *server.EndGame, stream server.Broadcast_EndServer) error {
	wait := sync.WaitGroup{}
	done := make(chan int)

	if pool, ok := s.Connections[req.GameId]; ok {
		didEnd := false
		for _, conn := range pool.All() {
			wait.Add(1)
			go func(req *server.EndGame, stream server.Broadcast_EndServer) {
				defer wait.Done()
				log.Printf("Signalling end of game to: %v", conn.ID)
				if req.GameId == conn.GameID  {
					didEnd = true
					err := conn.Stream.Send(&server.Message{End: true})
					if err != nil {
						fmt.Errorf("Failed to send question: %v", err)
					}
				}
			}(req, stream)
		}

		if didEnd {
			s.Connections[req.GameId] = &services.UserConnectionPool{}
		}
	}

	go func() {
		wait.Wait()
		close(done)
	}()

	<-done
	return nil
}

// Disconnect -
func (s *LiveServer) Disconnect(ctx context.Context, conn *server.Connection) (*server.DisconnectResponse, error) {
	// var connToRemove int
	pool := s.Connections[conn.GameId]

	if len(pool.All()) > 0 {
		log.Print("Disconnecting User:")
		for _, c := range pool.All() {
			if c.ID == conn.User.Id {
				//connToRemove = i;
			}
		}
		// TODO: Check if this is used
		// s.Connections[conn.GameId] = removeConnection(connections, connToRemove)
	}

	return &server.DisconnectResponse{}, nil
}


// AuditConnections - audits the active connections
// Client should be sending a heartbeat request every 3 seconds.
func (s *LiveServer) AuditConnections() {
	log.Print("Auditing connections started...")
	wait := sync.WaitGroup{}
	for {
		if len(s.Connections) > 0 {
			time.Sleep(time.Second * 5)
			for key, conns := range s.Connections {
				wait.Add(1)

				go func (gameID string, pool services.ConnectionPool) {
					defer wait.Done()
					idsToRemove := []string{}
					var hostStream server.Broadcast_CreateStreamServer
					connections := pool.All()
					for _, c := range connections {
						if c.IsActive() {
							log.Printf("%s is inactive.", c.ID)
							idsToRemove = append(idsToRemove, c.ID);
							c.SetActive(false)
						}
	
						if c.IsHost {
							hostStream = c.Stream
						}
					}
	
					for _, id := range idsToRemove {
						if hostStream != nil {
							hostStream.Send(&server.Message{RemovedPlayer: &server.User{Id: id}})
						}
					}
	
					if len(idsToRemove) > 0 {
						idsToRemove = []string{}
					}
				}(key, conns)

			}
		}
	}
}

// Heartbeat -
func (s *LiveServer) Heartbeat(ctx context.Context, conn *server.Connection) (*server.HeartbeatResponse, error) {
	connections := s.Connections[conn.GameId].All()
	for _, c := range connections {
		if c.ID == conn.User.Id {
			now := time.Now()
			c.SetLastConnected(now)
			break;
		}
	}

	return &server.HeartbeatResponse{}, nil
}

// GetPlayerList -
func (s *LiveServer) GetPlayerList(ctx context.Context, req *server.PlayerlistRequest) (*server.PlayerListResponse, error) {
	var playerList server.PlayerListResponse
	pool := s.Connections[req.GameId]
	for _, c := range pool.All() {
		playerList.Players = append(playerList.Players, &server.User{
			DisplayName: c.DisplayName,
			Id: c.ID,
			IsHost: c.IsHost,
		})
	}

	return &playerList, nil
}