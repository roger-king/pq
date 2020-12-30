package app

import "github.com/roger-king/pq/streaming/pkg/server"

type Connection struct {
	Stream server.Broadcast_CreateStreamServer
	GameID string
	UserID string
	DisplayName string
	Active bool
	LastConnected int64
	IsHost bool
	Error  chan error
}