import { useEffect, useState } from 'react';
import { BroadcastMessage } from '../@types';
import { Connection } from '../grpc/broadcast_pb';
import { useBroadcastClient } from './useGrpcClient';

export const useBroadcastStream = (connection: Connection | null) => {
  const client = useBroadcastClient();
  const [message, setMessage] = useState<BroadcastMessage>({
    time: 60,
    question: null,
    newplayer: null,
    removedplayer: null,
    connected: false,
    end: false,
  });

  useEffect(() => {
    if (connection) {
      // console.info('Connecting to broadcast stream');
      const stream = client.createStream(connection, {});
      stream.on('data', async (res: any) => {
        setMessage({ ...message, ...res.toObject(), connected: true });
      });
      stream.on('error', async () => {
        const updatedMsg = message;
        updatedMsg.connected = false;
        setMessage({ ...updatedMsg });
      });
      stream.on('end', async () => {
        const updatedMsg = message;
        updatedMsg.connected = false;
        setMessage({ ...updatedMsg });
      });
      setInterval(() => {
        client.heartbeat(connection, {}).catch((e) => {
          console.error('Error sending heartbeat');
          const updatedMsg = message;
          updatedMsg.connected = false;
          setMessage({ ...updatedMsg });
        });
      }, 5000);
    }
  }, [connection]);

  return message;
};
