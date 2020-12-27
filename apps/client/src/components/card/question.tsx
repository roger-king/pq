import React, { PropsWithChildren } from 'react';
import { Box } from 'grommet';

export interface QuestionCardProps {
  elevation?: boolean;
  border?: boolean;
}

export const QuestionCard: React.FC<PropsWithChildren<QuestionCardProps>> = ({
  children,
  elevation,
  border,
}: PropsWithChildren<QuestionCardProps>) => {
  return (
    <Box
      elevation={elevation ? 'medium' : 'none'}
      pad="medium"
      border={border}
      height={{ min: '278px', max: '400px' }}
      background="light-4"
    >
      {children}
    </Box>
  );
};
