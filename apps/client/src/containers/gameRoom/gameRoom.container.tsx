import React from 'react';
import { Box, Heading } from 'grommet';
import { useQuery } from 'react-query';
import Axios from 'axios';
import { API_URL } from '../../constants';

export interface GameRoomContainerProps {
  code: string;
}

export const GameRoomContainer: React.FC<GameRoomContainerProps> = ({ code }: GameRoomContainerProps) => {
  const { data, isLoading } = useQuery('game', async () => {
    const d = Axios.put(`${API_URL}/games/${code}/join`);
    return d;
  });

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box>
      <Heading>{code}</Heading>
      {data?.data.is_host && 'host'}
    </Box>
  );
};
