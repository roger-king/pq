import React from 'react';
import App from 'next/app';
import { AppContextType } from 'next/dist/next-server/lib/utils';
import { Router } from 'next/router';
import { Root } from '../layouts';

class _App extends App {
  // TODO: Fix this to optimize the page renders
  static async getInitialProps(appContext: AppContextType<Router>) {
    const appProps = await App.getInitialProps(appContext);
    return { ...appProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Root>
        <Component {...pageProps} />
      </Root>
    );
  }
}

export default _App;
