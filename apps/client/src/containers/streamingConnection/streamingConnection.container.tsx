import React, { useEffect, useState } from 'react';
import { Box, Text } from 'grommet';
import { Connection, User } from '../../grpc/broadcast_pb';
import { useBroadcastClient } from '../../hooks/useGrpcClient';

export interface StreamConnectionProps {
  created_by: string;
  code: string;
  isHost?: boolean;
}

export const StreamConnection: React.FC<StreamConnectionProps> = ({ created_by, code, isHost }) => {
  const client = useBroadcastClient();
  const [connected, setConnected] = useState<boolean>(false);
  const connectToBroadcastServer = () => {
    const user = new User();
    user.setDisplayName(created_by);
    user.setId(created_by);
    user.setIsHost(isHost ? isHost : false);

    const connection = new Connection();
    connection.setGameId(code);
    connection.setActive(true);
    connection.setUser(user);

    const stream = client.createStream(connection, {});
    stream.on('data', async function (response: any) {
      setConnected(true);
    });
  };

  useEffect(() => {
    if (!connected) {
      connectToBroadcastServer();
    }
  }, []);

  return (
    <Box direction="row" gap="small" align="center" justify="center">
      <Box background={connected ? 'green' : 'red'} style={{ borderRadius: '50px' }} width="15px" height="15px" />
      <Text>{connected ? 'Connected' : 'Not Connected'}</Text>
    </Box>
  );
};
