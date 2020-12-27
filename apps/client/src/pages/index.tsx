import React, { useContext } from 'react';
import { Box, Button, Heading, Text, Image, ResponsiveContext } from 'grommet';

import { useRouter } from 'next/router';
import { withMainLayout } from '../layouts/main';

const IndexPage: React.FC = () => {
  const size = useContext(ResponsiveContext);
  const router = useRouter();
  const widthSize = size.includes('small') ? '100%' : '50%';

  return (
    <Box align="center" justify="center" fill gap="small" direction="row-responsive">
      {/* <Image src="/images/splash.jpg" /> */}
      <Box width={widthSize} height="100%" align="center" justify="center" background="#001932" gap="small">
        <Heading level="1" margin="5px">
          Welcome!
        </Heading>
        <Text size="1.3em">
          This is POP quiz (PQ). A place for you to create your own trivia like games to play with your friends!
        </Text>
        <Button type="submit" label="Create" primary onClick={() => router.push('/create')} />
      </Box>
    </Box>
  );
};

export default withMainLayout(IndexPage);
