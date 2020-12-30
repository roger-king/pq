package server

import (
	context "context"
	"fmt"
	"log"
	sync "sync"
	"time"

	app "github.com/roger-king/pq/streaming/pkg"
)

// LiveServer -
type LiveServer struct {
	Connections map[string][]*app.Connection
}

// NewLiveServer -
func NewLiveServer() *LiveServer {
	return &LiveServer{}
}

// CreateStream -
func (s *LiveServer) CreateStream(req *Connection, stream Broadcast_CreateStreamServer) error {
	now := time.Now() 
	conn := &app.Connection{
		Stream: stream,
		GameID: req.GameId,
		UserID: req.User.Id,
		DisplayName: req.User.DisplayName,
		IsHost: req.User.IsHost,
		LastConnected: now.Unix(),
		Active: true,
		Error:  make(chan error),
	}

	if currentConns, ok := s.Connections[req.GameId]; ok {
		alreadyConnected := false
		for i, c := range currentConns {
			if c.UserID == req.User.Id {
				alreadyConnected = true;
				s.Connections[req.GameId][i].LastConnected = now.Unix() 
			}

			if c.IsHost {
				log.Print("Sending new player")
				c.Stream.Send(&Message{NewPlayer: &User{Id: conn.UserID, DisplayName: conn.DisplayName, IsHost: false}})
			}
		}

		if !alreadyConnected {
			log.Printf("User is connected: %s", conn.DisplayName)
			s.Connections[req.GameId] = append(currentConns, conn)
		}
	} else {
		s.Connections = make(map[string][]*app.Connection)
		log.Printf("User is connected: %s", conn.DisplayName)
		s.Connections[req.GameId] = []*app.Connection{conn}
	}

	err := stream.Send(&Message{Time: int64(60), NewPlayer: nil, RemovedPlayer: nil, Question: nil})

	if err != nil {
		return err
	}

	return <-conn.Error
}

// Start -
func (s *LiveServer) Start(req *StartQuestion, stream Broadcast_StartServer) error {
	wait := sync.WaitGroup{}
	done := make(chan int)

	if conns, ok := s.Connections[req.GameId]; ok {
		log.Print(len(conns))
		for _, conn := range conns {
			wait.Add(1)
			go func(req *StartQuestion, stream Broadcast_StartServer) {
				defer wait.Done()
				log.Printf("Starting counddown: %v", conn.UserID)
				if req.GameId == conn.GameID && conn.Active  {
	
					countdown := 10
					// Send question to players
					err := conn.Stream.Send(&Message{Question: req.Question, Time: int64(countdown)})
					if err != nil {
						fmt.Errorf("Failed to send question: %v", err)
					}
					
					// Starting countdown
					for countdown != 0 {
						countdown--
						time.Sleep(time.Second * 1)
						
						err := conn.Stream.Send(&Message{Time: int64(countdown), Question: req.Question})
						if req.IsHost {
							// ToDO: look into why the connection stream doesnt send to the host too.
							stream.Send(&Message{Time: int64(countdown)})
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
func (s *LiveServer) End(req *EndGame, stream Broadcast_EndServer) error {
	wait := sync.WaitGroup{}
	done := make(chan int)

	if conns, ok := s.Connections[req.GameId]; ok {
		didEnd := false
		for _, conn := range conns {
			wait.Add(1)
			go func(req *EndGame, stream Broadcast_EndServer) {
				defer wait.Done()
				log.Printf("Signalling end of game to: %v", conn.UserID)
				if req.GameId == conn.GameID  {
					didEnd = true
					err := conn.Stream.Send(&Message{End: true})
					if err != nil {
						fmt.Errorf("Failed to send question: %v", err)
					}
				}
			}(req, stream)
		}

		if didEnd {
			s.Connections[req.GameId] = []*app.Connection{}
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

func(s *LiveServer) getGameConnections(gameID string) []*app.Connection {
	return s.Connections[gameID]
}

// Disconnect -
func (s *LiveServer) Disconnect(ctx context.Context, conn *Connection) (*DisconnectResponse, error) {
	// var connToRemove int
	connections := s.Connections[conn.GameId]

	if len(connections) > 0 {
		log.Print("Disconnecting User:")
		for _, c := range connections {
			if c.UserID == conn.User.Id {
				//connToRemove = i;
			}
		}
		// TODO: Check if this is used
		// s.Connections[conn.GameId] = removeConnection(connections, connToRemove)
	}

	return &DisconnectResponse{}, nil
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
				go func (gameID string, connections []*app.Connection) {
					defer wait.Done()
					idsToRemove := []int{}
					var hostStream Broadcast_CreateStreamServer
					for i, c := range connections {
						now := time.Now().Unix()
						// We give a grace period of 15 seconds for the user.
						if c.LastConnected + 15 < now && c.Active {
							log.Printf("%s is inactive.", c.UserID)
							idsToRemove = append(idsToRemove, i);
							s.Connections[gameID][i].Active = false
						}
	
						if c.IsHost {
							hostStream = c.Stream
						}
					}
	
					for _, id := range idsToRemove {
						if hostStream != nil {
							hostStream.Send(&Message{RemovedPlayer: &User{Id: s.Connections[gameID][id].UserID}})
						}
					}
	
					if len(idsToRemove) > 0 {
						idsToRemove = []int{}
					}
				}(key, conns)

			}
		}
	}
}

// Heartbeat -
func (s *LiveServer) Heartbeat(ctx context.Context, conn *Connection) (*HeartbeatResponse, error) {
	didUpdate := false
	connections := s.Connections[conn.GameId]
	for _, c := range connections {
		if c.UserID == conn.User.Id {
			didUpdate = true
			c.LastConnected = time.Now().Unix()
			break;
		}
	}

	if didUpdate {
		s.Connections[conn.GameId] = connections
	}

	return &HeartbeatResponse{}, nil
}

// GetPlayerList -
func (s *LiveServer) GetPlayerList(ctx context.Context, req *PlayerlistRequest) (*PlayerListResponse, error) {
	var playerList PlayerListResponse
	connections := s.Connections[req.GameId]
	for _, c := range connections {
		playerList.Players = append(playerList.Players, &User{
			DisplayName: c.DisplayName,
			Id: c.UserID,
			IsHost: c.IsHost,
		})
	}

	return &playerList, nil
}