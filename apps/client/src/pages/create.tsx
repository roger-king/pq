import React from 'react';
import { Box } from 'grommet';

import { withMainLayout } from '../layouts/main';
import { CreateGameContainer } from '../containers/createGame/createGame.container';

const CreatePage: React.FC = () => {
  return (
    <Box fill margin={{ top: '30px', bottom: '30px' }}>
      <Box margin={{ left: '200px', right: '200px', top: '20px', bottom: '20px' }} gap="small" flex={false}>
        <CreateGameContainer />
      </Box>
    </Box>
  );
};

export default withMainLayout(CreatePage);
