import React from 'react';
import App from 'next/app';
import { Root } from '../layouts';
import { AppContextType } from 'next/dist/next-server/lib/utils';
import { Router } from 'next/router';

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
