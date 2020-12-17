import React from 'react';
import { Header as InnerHeader, Heading} from 'grommet';
import Router from 'next/router';

import { Logo } from './../logo';

interface HeaderProps {
    gridArea: string;
}

export const Header: React.FC<HeaderProps> = (props: HeaderProps): JSX.Element => {
    const { gridArea } = props;
    return (
        <InnerHeader gridArea={gridArea} pad={{ left: '50px', right: '50px' }}>
            <Heading level="3" onClick={() => Router.push('/')} style={{ cursor: 'pointer' }}>
                <Logo />
            </Heading>
        </InnerHeader>
    );
};
