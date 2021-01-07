import React from 'react';
import { Box, Heading } from 'grommet';

export const Logo: React.FC = () => {
  return (
    <Box background="brand" pad="small">
      <Heading margin="none" level="2">
        PQ
      </Heading>
    </Box>
  );
};
