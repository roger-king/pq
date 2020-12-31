import React from 'react';
import { Box, Heading } from 'grommet';

export const Logo: React.FC = () => {
  return (
    <Box direction="row" align="end">
      <Box margin={{ right: '10px' }} background="brand" pad="small">
        <Heading margin="none" level="2">
          POPPOP
        </Heading>
      </Box>
      <Heading level="3" margin="none">
        quiz
      </Heading>
    </Box>
  );
};
