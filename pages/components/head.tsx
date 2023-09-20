import Head from 'next/head';

const MyHead: React.FC = () => {
    return (
        <Head>
            <title>Mingts|生字词学习</title>
            <meta name="description" content={'生字词学习卡片'}/>
            <meta name="author" content={'kailous rainforest'}/>
            <meta name="keywords" content={'生字词学习卡片'}/>
            <link rel="icon" href="/favicon.ico" type="image/ico"/>

            <link rel="apple-touch-icon" href="/favicon.ico"/>

            <link rel="mask-icon" href="/favicon.ico" color="blue"/>

            {/*<meta name="theme-color" content="#3498db"/>*/}


            <link rel="icon" href="/favicon.ico" type="image/x-icon"/>
            <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>


            {/* 其他 */}
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta name="apple-mobile-web-app-capable" content="yes"/>
            <meta name="mobile-web-app-capable" content="yes"/>

            {/* 添加社交媒体平台的 meta */}
            <meta property="og:title" content={'Mingts|生字词学习'}/>
            <meta property="og:description" content={'生字词学习卡片'}/>

            <meta name="twitter:title" content={'Mingts|生字词学习'}/>
            <meta name="twitter:description" content={'生字词学习卡片'}/>

            {/* 更多社交媒体平台的 meta 标签 */}

            {/* 字节图标库 */}
            <script src="https://lf1-cdn-tos.bytegoofy.com/obj/iconpark/svg_28472_11.6facf12caa31639f6692ddbf8b0102bf.js"
                    async></script>
        </Head>
    );
};

export default MyHead;
