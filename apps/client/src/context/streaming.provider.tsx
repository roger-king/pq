import React, { PropsWithChildren } from 'react';
import { BroadcastClient } from '../grpc/BroadcastServiceClientPb';

export const GRPCContext = React.createContext<{ client: BroadcastClient }>({ client: new BroadcastClient('') });

export const GRPCProvider: React.FC<PropsWithChildren<{ host: string }>> = ({ children, host }) => {
  const client = new BroadcastClient(host);
  return <GRPCContext.Provider value={{ client: client }}>{children}</GRPCContext.Provider>;
};
