// pages/_app.js

import './css/globals.css'; // 引入全局样式
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  return (
      <>
      <Component {...pageProps} />
        <Analytics />
      </>
  );
}

export default MyApp;
