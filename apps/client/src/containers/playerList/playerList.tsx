import React, { useEffect, useState } from 'react';
import { Box, Text } from 'grommet';
import { PlayerlistRequest } from '../../grpc/broadcast_pb';
import { useBroadcastClient } from '../../hooks/useGrpcClient';
import { User } from '../../grpc/broadcast_pb';
import { ClientReadableStream } from 'grpc-web';

interface PlayerListProps {
  gameId: string;
  broadcastStream?: ClientReadableStream<unknown> | null;
}

export const PlayerList: React.FC<PlayerListProps> = ({ gameId, broadcastStream }: PlayerListProps) => {
  const client = useBroadcastClient();
  const [players, setPlayers] = useState<{ name: string; id: string }[]>([]);
  const [expectedPlayerLength] = useState<number>(players.length);

  const initBroadcastStream = () => {
    if (broadcastStream) {
      broadcastStream.on('data', (response: any) => {
        console.log('Broadcast found: ');
        const { newplayer, removedplayer } = response.toObject();
        if (newplayer) {
          console.log('adding player', newplayer);
          setPlayers([...players, { name: newplayer.displayName, id: newplayer.id }]);
        }

        if (removedplayer && expectedPlayerLength - 1 < players.length) {
          // fix this
          console.log('removing player', removedplayer);
          const updatedPlayers = players.filter((u) => u.id !== removedplayer.id);
          setPlayers([...updatedPlayers]);
        }
      });

      broadcastStream.on('end', () => {
        console.log('ending');
      });
      broadcastStream.on('error', (err) => {
        console.log('error: ', err);
      });
    }
  };

  useEffect(() => {
    if (players.length === 0) {
      const playerReq = new PlayerlistRequest();
      playerReq.setGameId(gameId);
      client.getPlayerList(playerReq, {}).then((response) => {
        const updatedPlayers = response.getPlayersList().map((u) => ({ name: u.getDisplayName(), id: u.getId() }));
        setPlayers([...updatedPlayers]);
      });
    } else {
      initBroadcastStream();
    }
  }, [players]);

  return (
    <Box direction="column" gap="small" width="150px" height={{ min: 'auto' }} pad="small" border="all">
      {players.map((u) => {
        return <Text key={u.id}>{u.name}</Text>;
      })}
    </Box>
  );
};
