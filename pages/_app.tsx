// pages/_app.js

import './css/globals.css'; // 引入全局样式

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  return <Component {...pageProps} />;
}

export default MyApp;
