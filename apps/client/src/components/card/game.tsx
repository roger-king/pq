import React, { PropsWithChildren } from 'react';
import { Box } from 'grommet';
import { Timer } from '../timer';
import { ConnectionStatus } from '../connectionStatus';

export interface GameCardProps {
  time: number;
  connected: boolean;
}

export const GameCard: React.FC<PropsWithChildren<GameCardProps>> = ({
  time,
  connected,
  children,
}: PropsWithChildren<GameCardProps>) => {
  return (
    <Box background="light-4" pad="medium" width="70%" height="50%" border>
      <Box direction="row" height="20%" align="center" justify="center" gap="small">
        <Timer time={time} />
      </Box>
      <Box direction="row" height="60%" align="center" justify="center">
        {children}
      </Box>
      <Box direction="row" height="20%" align="end">
        <ConnectionStatus connected={connected} />
      </Box>
    </Box>
  );
};
