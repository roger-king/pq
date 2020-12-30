package models

import (
	"testing"
	"time"

	"github.com/stretchr/testify/require"
	"github.com/stretchr/testify/suite"
)

type UserConnectionSuite struct {
	suite.Suite

	user *UserConnection
}

func (s *UserConnectionSuite) SetupTest() {
	s.user = &UserConnection{
		ID: "1234",
		Stream: nil,
		DisplayName: "HostPerson",
		LastConnected: time.Now().Unix(),
		IsHost: true,
		Active: true,
		Error: make(chan error),
	}
}

func (s *UserConnectionSuite) TestUserConnection_SetActive() {
	ok := s.user.SetActive(false)
	require.True(s.T(), ok)
	require.False(s.T(), s.user.Active)
}

func (s *UserConnectionSuite) TestUserConnection_SetIsHost() {
	ok := s.user.SetIsHost(false)
	require.True(s.T(), ok)
	require.False(s.T(), s.user.IsHost)
}

func (s *UserConnectionSuite) TestUserConnection_SetLastConnected() {
	ok := s.user.SetLastConnected(time.Now())
	require.True(s.T(), ok)
}

func (s *UserConnectionSuite) TestUserConnection_IsActive() {
	ok := s.user.IsActive()
	require.False(s.T(), ok)
}

func (s *UserConnectionSuite) TestUserConnection_SetError() {
	ok := s.user.SetError(make(chan error))
	require.True(s.T(), ok)
}

func TestUserConnectionSuite(t *testing.T) {
	suite.Run(t, new(UserConnectionSuite))
}