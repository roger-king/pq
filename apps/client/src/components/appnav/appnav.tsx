import React, { useRef, useState } from 'react';
import { Box, Button, Drop, Text } from 'grommet';
import { Home, LineChart, Search, Group, User, Ad } from 'grommet-icons';
import { useRouter } from 'next/router';
import { User as UserType } from '../../@types';

export interface AppNavProps {
    user: UserType | null;
}

export const AppNav: React.FC<AppNavProps> = (props: AppNavProps) => {
    const { user } = props;
    const { pathname } = useRouter();
    const ref = useRef(null);
    const [over, setOver] = useState(false);
    const AppNavConfig = [
        {
            label: 'Home',
            icon: <Home />,
            path: '/',
        },
        {
            label: 'Find a player',
            icon: <Search />,
            path: '/find-player',
        },
        // {
        //     label: 'Leaderboard',
        //     icon: <LineChart />,
        //     path: '/leaderboard',
        // },
        {
            label: 'Community',
            icon: <Ad />,
            path: `/community`,
            comingSoon: true,
        },
        {
            label: 'Profile',
            icon: <User />,
            path: `/user/me`,
        },
        {
            label: 'Invite Your Friends',
            icon: <Group />,
            path: '/invite',
        },
    ];

    return (
        <Box
            data-testid="app-nav"
            gridArea="sidebar"
            background="light-5"
            width="medium"
            pad={{ top: '70px' }}
            animation={[
                { type: 'fadeIn', duration: 300 },
                { type: 'slideRight', size: 'xlarge', duration: 150 },
            ]}
            align="center"
            style={{ borderTopRightRadius: '10px' }}
        >
            {AppNavConfig.map((c) => (
                <Button key={c.label} href={c.comingSoon ? `#` : `${c.path}`} hoverIndicator>
                    <Box
                        pad={{ horizontal: 'medium', vertical: 'small' }}
                        direction="row"
                        gap="small"
                        align="center"
                        height="70px"
                        width={{ min: '300px', max: '200px' }}
                        style={{ borderRadius: '10px' }}
                        // TODO: fix for profile
                        background={c.path === pathname ? 'white' : ''}
                    >
                        {c.icon}
                        <Text>{c.label}</Text>
                        {c.comingSoon && <Text>(Coming soon!)</Text>}
                    </Box>
                </Button>
            ))}
        </Box>
    );
};
