import { Box } from 'grommet';
import { useRouter } from 'next/router';
import React from 'react';
import { GameRoomContainer } from '../../containers/gameRoom';

export const GameRoom: React.FC = () => {
  const router = useRouter();
  const { code } = router.query;

  return (
    <Box>
      <GameRoomContainer code={code as string} />
    </Box>
  );
};

export default GameRoom;
