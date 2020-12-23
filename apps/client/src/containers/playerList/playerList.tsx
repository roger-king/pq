import React, { useEffect, useState } from 'react';
import { Box, Text } from 'grommet';
import { PlayerlistRequest } from '../../grpc/broadcast_pb';
import { useBroadcastClient } from '../../hooks/useGrpcClient';
import { User } from '../../grpc/broadcast_pb';

interface PlayerListProps {
  gameId: string;
}

export const PlayerList: React.FC<PlayerListProps> = ({ gameId }: PlayerListProps) => {
  const client = useBroadcastClient();
  const [players, setPlayers] = useState<{ name: string; id: string }[]>([]);

  useEffect(() => {
    if (players.length === 0) {
      const playerReq = new PlayerlistRequest();
      playerReq.setGameId(gameId);
      client.getPlayerList(playerReq, {}).then((response) => {
        const players = response.getPlayersList().map((u) => ({ name: u.getDisplayName(), id: u.getId() }));
        setPlayers([...players]);
      });
    }
  });

  return (
    <Box direction="column" gap="small" width="150px" height={{ min: 'auto' }} pad="small" border="all">
      {players.map((u) => {
        return <Text key={u.id}>{u.name}</Text>;
      })}
    </Box>
  );
};
