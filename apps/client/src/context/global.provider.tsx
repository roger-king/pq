import React, { PropsWithChildren } from 'react';

export const GlobalStateContext = React.createContext<{ room: string; isPlaying: boolean }>({
  room: '',
  isPlaying: true,
});

export const GlobalStateProvider: React.FC<PropsWithChildren<{ room: string; isPlaying: boolean }>> = ({
  children,
  room,
  isPlaying,
}: PropsWithChildren<{ room: string; isPlaying: boolean }>) => {
  return <GlobalStateContext.Provider value={{ room, isPlaying }}>{children}</GlobalStateContext.Provider>;
};
