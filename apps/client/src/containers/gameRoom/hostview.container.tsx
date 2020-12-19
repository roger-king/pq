import React from 'react';
import { Box, Button } from 'grommet';
import { useMutation } from 'react-query';
import Axios from 'axios';
import { API_URL } from '../../constants';

export interface HostViewProps {
  code: string;
  is_started: boolean;
}

export const HostView: React.FC<HostViewProps> = ({ code, is_started }: HostViewProps) => {
  const [start] = useMutation(async ({ hostCode }: { hostCode: string }) => {
    await Axios.put(`${API_URL}/games/${hostCode}/start`);
  });

  return (
    <Box>
      {!is_started ? <Button label="Start PQ" onClick={() => start({ hostCode: code })} /> : <Box>Game started</Box>}
    </Box>
  );
};
