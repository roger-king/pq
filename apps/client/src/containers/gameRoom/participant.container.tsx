import React, { useEffect, useState } from 'react';
import { Box, Text } from 'grommet';
import { StreamConnection } from '../streamingConnection/streamingConnection.container';
import { Game } from '../../@types';
import { Connection, TimerRequest, User } from '../../grpc/broadcast_pb';
import { useBroadcastClient } from '../../hooks/useGrpcClient';

export interface ParticipantViewProps {
  game: Game;
}

export const ParticipantView: React.FC<ParticipantViewProps> = ({ game }) => {
  const client = useBroadcastClient();
  const [connected, setConnected] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);
  const { created_by, code } = game;

  const connectToBroadcastServer = () => {
    const user = new User();
    user.setDisplayName('test');
    user.setId('test');
    user.setIsHost(false);

    const connection = new Connection();
    connection.setGameId(code);
    connection.setActive(true);
    connection.setUser(user);

    const stream = client.createStream(connection, {});
    stream.on('data', async function (response: any) {
      const { time } = response.toObject();
      setTimer(time);
      setConnected(true);
    });
  };

  useEffect(() => {
    if (!connected) {
      connectToBroadcastServer();
    }
  }, []);

  return (
    <Box fill background="brand" align="center" justify="center">
      <Box direction="row" gap="small" align="center" justify="center">
        <Box background={connected ? 'green' : 'red'} style={{ borderRadius: '50px' }} width="15px" height="15px" />
        <Text>{connected ? 'Connected' : 'Not Connected'}</Text>
      </Box>
      <Text>{timer}</Text>
    </Box>
  );
};
