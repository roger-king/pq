import React from 'react';
import { Box, Heading, Text } from 'grommet';
import { useQuery } from 'react-query';
import Axios from 'axios';

import { HostView } from './hostview.container';
import { JoinedGame } from '../../@types';
import { API_URL } from '../../constants';
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

  if (gameData) {
    const { data } = gameData;
    return <Box fill>{data.is_host && <HostView game={{ ...data }} />}</Box>;
  }

  return (
    <Box fill>
      <Heading>{code}</Heading>
      <Text> Something went wrong getting game information. We are working on it.</Text>
    </Box>
  );
};
