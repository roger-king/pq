import React from 'react';
import { Box, Heading, Text } from 'grommet';
import { useQuery } from 'react-query';
import Axios from 'axios';

import { HostLobbyView, HostInGameView } from './host.container';
import { JoinedGame } from '../../@types';
import { API_URL } from '../../constants';
import { ParticipantView } from './participant.container';
export interface GameRoomContainerProps {
  code: string;
}

export const GameRoomContainer: React.FC<GameRoomContainerProps> = ({ code }: GameRoomContainerProps) => {
  const { data: gameData, isLoading } = useQuery<{ data: JoinedGame }>('game', async () => {
    const d = Axios.put(`${API_URL}/games/${code}/join`);
    return d;
  });

  if (isLoading && !gameData) {
    return <Box>Loading...</Box>;
  }

  // TODO: add redirect if not valid code.
  if (gameData) {
    const { data } = gameData;
    if (data.is_host) {
      if (data.is_started) {
        // Show Host Started View
        return (
          <Box fill>
            <HostInGameView game={{ ...data }} />
          </Box>
        );
      }

      return (
        <Box fill>
          <HostLobbyView game={{ ...data }} />
        </Box>
      );
    }

    // Default to show participant view - This view will handle both started and not started.
    return (
      <Box fill>
        <ParticipantView game={{ ...data }} />
      </Box>
    );
  }

  return (
    <Box fill background="brand">
      <Heading>{code}</Heading>
      <Text> Something went wrong getting game information. We are working on it.</Text>
    </Box>
  );
};
