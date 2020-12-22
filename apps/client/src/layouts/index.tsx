// This Layout should be the root layout all layouts call
// It will include the Grommet
import React, { PropsWithChildren } from 'react';
import { Grommet } from 'grommet';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';

import { theme } from '../constants';
import { GRPCProvider } from '../context/streaming.provider';

export const queryCache = new QueryCache();
// eslint-disable-next-line
export const Root = (props: PropsWithChildren<{}>) => {
  const { children } = props;

  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <GRPCProvider host="http://localhost:9001">
        <Grommet theme={theme} full>
          {children}
        </Grommet>
      </GRPCProvider>
    </ReactQueryCacheProvider>
  );
};
