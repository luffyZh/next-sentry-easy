import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import * as Sentry from '@sentry/node';

Sentry.init({
  // Replace with your project's Sentry DSN
  dsn: 'https://1be02b174ffb454b8e2c5694ded0d44b@sentry.io/1867243'
})

class MyApp extends App {
  render() {
    const { Component, pageProps, err } = this.props
    const modifiedPageProps = { ...pageProps, err }

    return (
      <>
        <style jsx global>{`
          * {
            margin: 0;
            padding: 0;
          }
          html, body {
            background: #e2e3e4;
          }
        `}</style>
        <Head>
          <title>🐞Next-Sentry-Demo</title>
        </Head>
        <Component {...modifiedPageProps} />
      </>
    )

  }
}

export default MyApp;