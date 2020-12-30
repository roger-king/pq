package models

import (
	"time"

	"github.com/roger-king/pq/streaming/pkg/server"
)

// UserConnection -
type UserConnection struct {
	Stream server.Broadcast_CreateStreamServer
	ID string
	GameID string
	DisplayName string
	Active bool
	LastConnected int64
	IsHost bool
	Error  chan error
}

// SetActive -
func (u *UserConnection) SetActive(active bool) bool {
	u.Active = active
	return true
}

// SetIsHost -
func (u *UserConnection) SetIsHost(isHost bool) bool {
	u.IsHost = isHost
	return true
}


// SetLastConnected -
func (u *UserConnection) SetLastConnected(lastConnected time.Time) bool {
	u.LastConnected = lastConnected.Unix()
	return true
}

// IsActive - Checks last connected time with current time
func (u *UserConnection) IsActive() bool {
	now := time.Now()
	return u.Active && u.LastConnected + 15 < now.Unix()
}

// SetError -
func (u *UserConnection) SetError(e chan error) bool {
	u.Error = e
	return true
}