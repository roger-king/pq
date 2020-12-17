// This Layout should be the root layout all layouts call
// It will include the Grommet
import React, { PropsWithChildren } from 'react';
import { Grommet } from 'grommet';
import { QueryCache, ReactQueryCacheProvider } from 'react-query'

import { theme } from '../constants';


const queryCache = new QueryCache();

export const Root = (props: PropsWithChildren<{}>) => {
    const { children } = props;

    return (
        <ReactQueryCacheProvider queryCache={queryCache}>
            <Grommet theme={theme} full>
                {children}
            </Grommet>
        </ReactQueryCacheProvider>
    );
};
