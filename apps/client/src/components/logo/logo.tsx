import React from 'react';
import { Box, Heading } from 'grommet';

export const Logo: React.FC = () => {
    return <Box direction="row" align="end">
        <Box margin={{right: '10px'}} background="brand" pad="small">
            <Heading margin="none">POP</Heading>
        </Box>
        <Heading level="2" margin="none">quiz</Heading>
    </Box>
}