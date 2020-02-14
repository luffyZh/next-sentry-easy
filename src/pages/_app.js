import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import * as Sentry from '@sentry/node'

Sentry.init({
  // Replace with your project's Sentry DSN
  dsn: process.env.SENTRY_DSN,
  release: process.env.SENTRY_RELEASE,
  // enabled: process.env.NODE_ENV === 'production',
  beforeSend(event) {
    // Check if it is an exception, if so, show the report dialog
    if (process.browser && event.exception) {
      Sentry.showReportDialog({
        title: '程序发生了错误',
        subtitle: '尊敬的用户，',
        subtitle2: '如果您想提供帮助，请告诉我们下面发生了什么',
        labelName: '姓名',
        labelEmail: '邮箱',
        labelClose: '关闭',
        labelSubmit: '提交错误报告',
        labelComments: '发生了什么？如果可以，尽可能的将详细的错误操作描述清楚。',
        successMessage: '我们已经收到您的反馈，非常感谢！',
        eventId: event.event_id
      });
    }
    return event;
  }
});

class MyApp extends App {

  static async getInitialProps ({ Component, ctx }) {
    let pageProps = {};
    try {
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps({ ctx })
      }
      return { pageProps }
    } catch (err) {
      // This will work on both client and server sides.
      console.log('The Error happened in: ', typeof window === 'undefined' ? 'Server' : 'Client');
      Sentry.captureException(err);
      return { pageProps };
    }
  }
  
  render() {
    const { Component, pageProps, err } = this.props
    // Pass err to component
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
          .powered-by {
            display: none;
          }
        `}</style>
        <Head>
          <title>🐞Next-Sentry-Ease-Demo</title>
        </Head>
        <Component {...modifiedPageProps} />
      </>
    )
  }
}

export default MyApp