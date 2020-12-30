package services

import (
	"testing"
	"time"

	"github.com/roger-king/pq/streaming/pkg/models"
	"github.com/stretchr/testify/require"
	"github.com/stretchr/testify/suite"
)

var (
	users = []*models.UserConnection{
		&models.UserConnection{
			ID: "1234",
			Stream: nil,
			DisplayName: "HostPerson",
			LastConnected: time.Now().Unix(),
			IsHost: true,
			Active: true,
			Error: make(chan error),
		},
		&models.UserConnection{
			ID: "45789",
			Stream: nil,
			DisplayName: "Player1",
			LastConnected: time.Now().Unix(),
			IsHost: false,
			Active: true,
			Error: make(chan error),
		},
		&models.UserConnection{
			ID: "56789",
			Stream: nil,
			DisplayName: "Player2",
			LastConnected: time.Now().Unix(),
			IsHost: false,
			Active: true,
			Error: make(chan error),
		},
	}
)

type ConnectionPoolSuite struct {
	suite.Suite

	service *UserConnectionPool
}

func (s *ConnectionPoolSuite) SetupTest() {
	s.service = NewUserConnectionPool()

	for _, u := range users {
		s.service.Add(u)
	}
}

func (s *ConnectionPoolSuite) TestAll_ReturnsAllConnections() {
	connections := s.service.All()
	require.Equal(s.T(), 3, len(connections))
}

func (s *ConnectionPoolSuite) TestAddConnection() {
	ok := s.service.Add(&models.UserConnection{
		ID: "abcd312",
		Stream: nil,
		DisplayName: "Player3",
		LastConnected: time.Now().Unix(),
		IsHost: false,
		Active: true,
		Error: make(chan error),
	})
	require.True(s.T(), ok)
}

func (s *ConnectionPoolSuite) TestFindByID_Success() {
	user := s.service.FindByID("45789")
	require.Equal(s.T(), user.ID, "45789")
}

func (s *ConnectionPoolSuite) TestFindByID_IsNil() {
	user := s.service.FindByID("popop")
	require.Nil(s.T(), user)
}

func TestConnectionPoolSuite(t *testing.T) {
	suite.Run(t, new(ConnectionPoolSuite))
}