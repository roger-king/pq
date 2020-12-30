package services

import "github.com/roger-king/pq/streaming/pkg/models"

// ConnectionPool -
type ConnectionPool interface {
	Add(user *models.UserConnection) bool
	Remove(id string) bool
	All() []*models.UserConnection
	FindByID(id string) *models.UserConnection
}

// UserConnectionPool - pool of connections
type UserConnectionPool struct {
	Connections []*models.UserConnection
}

// NewUserConnectionPool -
func NewUserConnectionPool() *UserConnectionPool {
	return &UserConnectionPool{
		Connections: []*models.UserConnection{},
	}
}

// All - return all connections
func(c *UserConnectionPool) All() []*models.UserConnection {
	return c.Connections
}

// Add -
func (c *UserConnectionPool) Add(user *models.UserConnection) bool {
	previousLen := len(c.Connections)
	c.Connections = append(c.Connections, user)
	if previousLen < len(c.Connections) {
		return true
	}

	return false
}

// FindByID - finds a user within the connection pool
func (c *UserConnectionPool) FindByID(id string) *models.UserConnection {
	var user *models.UserConnection

	for _, conn := range c.Connections {
		if conn.ID == id {
			user = conn
			break
		}
	}

	return user
}
