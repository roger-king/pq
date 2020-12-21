import { useContext } from 'react';
import { GRPCContext } from '../context/streaming.provider';

export function useBroadcastClient() {
  const { client } = useContext(GRPCContext);
  return client;
}
