import React, { useEffect, useState } from 'react';
import { Box, Text } from 'grommet';
import { Game } from '../../@types';
import { Connection, User } from '../../grpc/broadcast_pb';
import { useBroadcastClient } from '../../hooks/useGrpcClient';
import { ConnectionStatus } from '../../components/connectionStatus';

export interface ParticipantViewProps {
  game: Game;
}

export const ParticipantView: React.FC<ParticipantViewProps> = ({ game }: ParticipantViewProps) => {
  const client = useBroadcastClient();
  const [connected, setConnected] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);
  const { created_by, code } = game; // eslint-disable
  const user = new User();
  user.setDisplayName('test');
  user.setId('test');
  user.setIsHost(false);
  const connection = new Connection();
  connection.setGameId(code);
  connection.setActive(true);
  connection.setUser(user);

  const connectToBroadcastServer = () => {
    const stream = client.createStream(connection, {});
    stream.on('data', async function (response: any) {
      const { time, question } = response.toObject();
      console.log('QUESTION: ', question);
      if (time && timer <= 60) {
        setTimer(time);
      }
      setConnected(true);
    });
  };

  useEffect(() => {
    if (!connected) {
      connectToBroadcastServer();
    }

    return () => {
      console.log('disconnecting     ');
      client.disconnect(connection, {});
    };
  }, []);

  // TODO: adding is_started check for participants
  return (
    <Box fill background="brand" align="center" justify="center">
      <ConnectionStatus connected={connected} />
      <Text>{timer}</Text>
    </Box>
  );
};
