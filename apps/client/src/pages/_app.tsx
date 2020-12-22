import React from 'react';
import App from 'next/app';
import { AppContextType } from 'next/dist/next-server/lib/utils';
import { Router } from 'next/router';
import { Root } from '../layouts';

// eslint-disable-next-line
class _App extends App {
  // eslint-disable-next-line
  static async getInitialProps(appContext: AppContextType<Router>) {
    const appProps = await App.getInitialProps(appContext);
    return { ...appProps };
  }

  render(): JSX.Element {
    const { Component, pageProps } = this.props;
    return (
      <Root>
        <Component {...pageProps} /> {/* eslint-disable-line */}
      </Root>
    );
  }
}

export default _App;
