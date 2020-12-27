import React from 'react';
import { Box, Text } from 'grommet';
import { InProgress } from 'grommet-icons';

export interface TimerProps {
  time: number;
}

export const Timer: React.FC<TimerProps> = ({ time }: TimerProps) => {
  return (
    <Box
      direction="row"
      align="center"
      justify="center"
      background="brand"
      pad="small"
      gap="small"
      style={{ borderRadius: '10px' }}
    >
      <Text size="2em" weight="bold" color={time > 10 ? 'white' : 'red'}>
        {time}
      </Text>
      <InProgress />
    </Box>
  );
};
