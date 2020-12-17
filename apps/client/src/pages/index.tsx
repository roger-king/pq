import React, { useState, useContext } from 'react';
import { Box, Button, Heading, Text, Form, FormField, ResponsiveContext } from 'grommet';

import { withMainLayout } from '../layouts/main';
import { useRouter } from 'next/router';

const IndexPage: React.FC<{}> = (props: {}) => {
    const size = useContext(ResponsiveContext);
    const router = useRouter();
    const widthSize = size.includes("small") ? '100%' : '50%';

    return (
        <Box align="center" justify="center" fill gap="small" direction="row-responsive">
            <Box width={widthSize} height="100%" align="center" justify="center" elevation="small" background="#001932" gap="small">
                <Heading level="3">Welcome!</Heading>
                <Text>
                    This is POP quiz (PQ). A place for you to create your own trivia like games to play with your friends!
                </Text>
                <Button type="submit" label="Create" primary onClick={() => router.push('/create')}/>
            </Box>
            <Box width={widthSize} height="100%" align="center" justify="center">
                <Heading level="3">Join a game</Heading>
                <Box width="80%" pad="medium">
                    <Form onSubmit={(e) => {
                        const { code }: any  = e.value;
                        router.push(`/pq/${code}`)
                    }}>
                        <FormField label="Room Code" required name="code" maxLength={12} minLength={12}/>
                        <Button type="submit" label="Join" primary />
                    </Form>
                </Box>
            </Box>
        </Box>
    );
};

export default withMainLayout(IndexPage);
