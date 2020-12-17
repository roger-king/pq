import React, { ComponentType } from 'react';
import { Box, Grid, ResponsiveContext } from 'grommet';

import { Header } from './../components/header/header.component';
import { Root } from './index';
import { ProtectedRouteProps } from './protected';

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
                                    { name: 'sidebar', start: [0, 1], end: [0, 1] },
                                    { name: 'main', start: [0, 0], end: [1, 1] },
                                ]}
                                rows={['auto', 'flex']}
                                columns={['auto', 'flex']}
                                gap="small"
                            >
                                {/* <Header gridArea="header" /> */}
                                {/* <AppNav user={user} /> */}
                                <Box
                                    gridArea="main"
                                    direction="column"
                                    gap="small"
                                    height="100%"
                                >
                                    <Component {...(props as T)} size={size} />
                                </Box>
                            </Grid>
                        </Root>
                    );
                }}
            </ResponsiveContext.Consumer>
        );
    };
}
