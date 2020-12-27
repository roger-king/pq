import { useContext } from 'react';
import { GlobalStateContext } from '../context/global.provider';

export function useGlobalState() {
  const { isPlaying, room } = useContext(GlobalStateContext);

  return { isPlaying, room };
}
