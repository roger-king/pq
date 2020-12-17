import React, { PropsWithChildren } from 'react';
import { Box } from 'grommet';

interface TileProps {
    background?: string;
}

export const Tile: React.FC<PropsWithChildren<TileProps>> = (props: PropsWithChildren<TileProps>) => {
    const { background, children } = props;

    return (
        <Box
            elevation="small"
            align="center"
            justify="center"
            width={{ min: '350px' }}
            height={{ min: '175px' }}
            round
            background={background ? background : `#f5f7f8`}
        >
            {children}
        </Box>
    );
};
