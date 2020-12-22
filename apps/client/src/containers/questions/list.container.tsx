import React from 'react';
import { Box, Heading, Text } from 'grommet';
import { useQuery } from 'react-query';
import Axios from 'axios';
import { Question } from '../../@types';
import { API_URL } from '../../constants';

export interface QuestionListProps {
  gameId: number;
}

export const QuestionList: React.FC<QuestionListProps> = ({ gameId }) => {
  const { data: questions, isLoading } = useQuery<{ data: Question[] }>(`game_${gameId}_questions`, async () => {
    const d = Axios.get(`${API_URL}/games/${gameId}/questions`);
    return d;
  });

  if (isLoading && !questions) {
    return <Box>loading...</Box>;
  }

  if (questions) {
    const { data } = questions;

    return (
      <Box margin="small" width="60%" height="400px">
        {data.map((q, i) => (
          <Box key={`${q.q}`} elevation="small" pad="medium">
            <Heading level="3">
              {i + 1}. {q.q}
            </Heading>
            {q.options.map((o) => (
              <Box key={o.key} gap="small" direction="row">
                <Text size="1.5em">
                  <b>{o.key}:</b>
                </Text>
                <Text size="1.5em">{o.title}</Text>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    );
  }

  return <Box>Something went wrong getting questions. We are looking into it.</Box>;
};
