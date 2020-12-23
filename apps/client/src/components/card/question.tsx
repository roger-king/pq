import React, { PropsWithChildren } from 'react';
import { Box } from 'grommet';

export interface QuestionCardProps {
  elevation?: boolean;
}

export const QuestionCard: React.FC<PropsWithChildren<QuestionCardProps>> = ({
  children,
  elevation,
}: PropsWithChildren<QuestionCardProps>) => {
  return (
    <Box elevation={elevation ? 'medium' : 'none'} pad="medium" border="all" height={{ min: '278px', max: '400px' }}>
      {children}
    </Box>
  );
};
