import React, { ComponentType } from 'react';
import Router from 'next/router';
import { NextPageContext } from 'next';

export interface ProtectedRouteProps {
  isAuthed: boolean;
}

export function protectedRoute<T extends ProtectedRouteProps>(Component: ComponentType<T>) {
  const WrappedComponent: any = (props: ProtectedRouteProps) => {
    return <Component {...(props as T)} />;
  };

  WrappedComponent.getInitialProps = async (ctx: NextPageContext): Promise<ProtectedRouteProps> => {
    const { req, res } = ctx;

    if (req) {
      const cookie: string | undefined = req.headers.cookie;
      if (cookie) {
        // const client = apolloClient({ Cookie: cookie });
        // const { data } = await client.query({
        //     query: ME,
        // });
        // if (data && data.me) {
        //     return { isAuthed: true, user: data.me };
        // }
      }
    }

    if (res) {
      res.writeHead(302, {
        Location: '/login',
      });
      res.end();
    } else {
      Router.push('/login');
    }

    return { isAuthed: false };
  };

  return WrappedComponent;
}
