import React, { ComponentType } from 'react';
import { Box, Grid, Heading, ResponsiveContext } from 'grommet';

import { Root } from './index';
import { ProtectedRouteProps } from './protected';
import { Header } from '../components/header/header.component';
export interface MainLayoutProps extends ProtectedRouteProps {
  size?: 'small' | 'medium' | 'large';
}

export function withMainLayout<T extends MainLayoutProps>(Component: ComponentType<T>) {
  return (props: MainLayoutProps) => {
    return (
      <ResponsiveContext.Consumer>
        {(size) => {
          return (
            <Root>
              <Grid
                fill
                areas={[
                  { name: 'header', start: [0, 0], end: [1, 0] },
                  { name: 'main', start: [0, 1], end: [1, 1] },
                ]}
                rows={['auto', 'flex']}
                columns={['auto', 'flex']}
              >
                <Header gridArea="header" />
                <Box gridArea="main" direction="column" gap="small" height="100%">
                  <Component {...(props as T)} size={size} />
                </Box>
                <Heading style={{ position: 'absolute', bottom: 0, left: 0 }} margin="small" level="3" color="white">
                  BETA
                </Heading>
              </Grid>
            </Root>
          );
        }}
      </ResponsiveContext.Consumer>
    );
  };
}
