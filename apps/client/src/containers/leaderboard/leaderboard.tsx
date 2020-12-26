import React from 'react';
import { Box, Heading, Text } from 'grommet';
import { Game } from '../../@types';
import { useQuery } from 'react-query';
import Axios from 'axios';
import { API_URL } from '../../constants';

interface LeaderBoardProps {
  code: string;
}

export const LeaderBoard: React.FC<LeaderBoardProps> = ({ code }: LeaderBoardProps) => {
  const { data: leaderboardData, isLoading } = useQuery<{
    data: { [key: string]: { display_name: string; score: number } };
  }>(`game_${code}_leaderboard`, async () => {
    return Axios.get(`${API_URL}/games/${code}/leaderboard`);
  });

  if (isLoading) {
    return <Box>loading...</Box>;
  }

  if (leaderboardData && leaderboardData.data) {
    const { data } = leaderboardData;
    const ids = Object.keys(data);
    const scores = ids.map((id) => data[id]).sort((a, b) => b.score - a.score);

    return (
      <Box align="center" justify="center">
        {scores.map((s) => {
          return (
            <Text key={s.display_name}>
              {s.display_name}: {s.score}
            </Text>
          );
        })}
      </Box>
    );
  }
  return <Box />;
};
