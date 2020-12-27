import React from 'react';
import { Box, Button, DropButton, Form, FormField, Header as InnerHeader, Heading, TextInput } from 'grommet';
import Router, { useRouter } from 'next/router';

import { Logo } from '../logo';

interface HeaderProps {
  gridArea: string;
}

export const Header: React.FC<HeaderProps> = (props: HeaderProps): JSX.Element => {
  const router = useRouter();
  const { gridArea } = props;
  return (
    <InnerHeader gridArea={gridArea} pad={{ left: '50px', right: '50px' }}>
      <Heading level="3" onClick={() => Router.push('/')} style={{ cursor: 'pointer' }}>
        <Logo />
      </Heading>
      {/* TODO: Add room name when joined */}
      <DropButton
        label="Join Game"
        alignSelf="center"
        dropContent={
          <Box pad="large" background="brand">
            <Form
              onSubmit={(e) => {
                const { code }: any = e.value;
                router.push(`/pq/${code}`);
              }}
            >
              <FormField name="code" placeholder="Room Code" maxLength={12} minLength={12} required />
              <Button type="submit" label="Join" />
            </Form>
          </Box>
        }
        dropAlign={{ top: 'bottom', right: 'right' }}
      />
    </InnerHeader>
  );
};
