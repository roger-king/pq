import React, { useEffect, useState } from 'react';
import { Box, Text } from 'grommet';
import { PlayerlistRequest } from '../../grpc/broadcast_pb';
import { useBroadcastClient } from '../../hooks/useGrpcClient';
import { Player } from '../../@types';

interface PlayerListProps {
  gameId: string;
  newplayer: Player | null;
  removedplayer: Player | null;
}

export const PlayerList: React.FC<PlayerListProps> = ({ gameId, newplayer, removedplayer }: PlayerListProps) => {
  const client = useBroadcastClient();
  const [players, setPlayers] = useState<{ name: string; id: string }[]>([]);

  useEffect(() => {
    if (players.length === 0) {
      const playerReq = new PlayerlistRequest();
      playerReq.setGameId(gameId);
      client.getPlayerList(playerReq, {}).then((response) => {
        const updatedPlayers = response.getPlayersList().map((u) => ({ name: u.getDisplayName(), id: u.getId() }));
        setPlayers([...updatedPlayers]);
      });
    }
    if (newplayer) {
      console.log('adding player', newplayer);
      setPlayers([...players, { name: newplayer.displayName, id: newplayer.id }]);
    }

    if (removedplayer) {
      // fix this
      console.log('removing player', removedplayer);
      const updatedPlayers = players.filter((u) => u.id !== removedplayer.id);
      setPlayers([...updatedPlayers]);
    }
  }, [newplayer, removedplayer]);

  return (
    <Box direction="column" gap="small" width="150px" height={{ min: 'auto' }} pad="small" border="all">
      {players.map((u) => {
        return <Text key={u.id}>{u.name}</Text>;
      })}
    </Box>
  );
};
