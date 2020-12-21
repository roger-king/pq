import React from 'react';
import { Box, Text } from 'grommet';

export interface ConnectionStatusProps {
  connected: boolean;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ connected }) => {
  return (
    <Box direction="row" gap="small" align="center" justify="center">
      <Box background={connected ? 'green' : 'red'} style={{ borderRadius: '50px' }} width="15px" height="15px" />
      <Text>{connected ? 'Connected' : 'Not Connected'}</Text>
    </Box>
  );
};
