import App from 'next/app'
import React from 'react'
import withReduxStore from '../lib/with-redux-store'
import {Provider} from 'react-redux'
import Navbar from "../components/Navbar";
import Head from 'next/head';

class MyApp extends App {
    render() {
        const {Component, pageProps, reduxStore} = this.props;
        return (
            <div>
                <Head>
                    <title>Test Store</title>
                    <link
                        rel="stylesheet"
                        href="https://bootswatch.com/4/lux/bootstrap.min.css"
                    />
                </Head>
                <div className="container">
                    <Provider store={reduxStore}>
                        <Navbar/>
                        <Component {...pageProps} />
                    </Provider>
                </div>
            </div>
        )
    }
}

export default withReduxStore(MyApp)
