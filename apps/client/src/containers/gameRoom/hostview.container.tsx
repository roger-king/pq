import React from 'react';
import { Box, Button, Heading, Text } from 'grommet';
import { Clipboard } from 'grommet-icons';
import { useMutation, useQuery } from 'react-query';
import Axios from 'axios';

import { capitalize } from '../../utils/format';
import { Game, Question } from './../../@types';
import { API_URL } from '../../constants';
import { QuestionList } from '../questions/list.container';

export interface HostViewProps {
  game: Game;
}

export const HostView: React.FC<HostViewProps> = ({ game }: HostViewProps) => {
  const { id, code, is_started, created_by } = game;

  const [start] = useMutation(async ({ hostCode }: { hostCode: string }) => {
    await Axios.put(`${API_URL}/games/${hostCode}/start`);
  });

  return (
    <Box fill>
      <Box gap="small" background="brand" align="center" justify="center" width="100%" height="95%">
        <Heading margin="small">Welcome, {capitalize(created_by)}</Heading>
        <Text size="1.5em">Share this code to have people join:</Text>
        <Box pad="small" direction="row">
          <Box background="light-5" fill pad="small" align="center" justify="center">
            <Text>
              <code>{code}</code>
            </Text>
          </Box>
          <Button icon={<Clipboard />} />
        </Box>
        <Button label="Start PQ" onClick={() => start({ hostCode: code })} primary size="large" />
      </Box>
      <Box align="center" justify="center">
        <Heading>Questions:</Heading>
        <QuestionList gameId={id} />
      </Box>
    </Box>
  );
};
