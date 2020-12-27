import React, { PropsWithChildren } from 'react';
import { BroadcastClient } from '../grpc/BroadcastServiceClientPb';

export const GRPCContext = React.createContext<{ client: BroadcastClient; isPlaying: boolean }>({
  client: new BroadcastClient(''),
  isPlaying: true,
});

export const GRPCProvider: React.FC<PropsWithChildren<{ host: string; isPlaying?: boolean }>> = ({
  children,
  host,
  isPlaying,
}: PropsWithChildren<{ host: string; isPlaying: boolean }>) => {
  const client = new BroadcastClient(host);
  return <GRPCContext.Provider value={{ client, isPlaying }}>{children}</GRPCContext.Provider>;
};
