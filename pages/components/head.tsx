import Head from 'next/head';

const MyHead: React.FC = () => {
    return (
        <Head>
            <title>Mingts|生字词学习</title>
            <meta name="description" content={'生字词学习卡片'} />
            <meta name="author" content={'kailous rainforest'} />

            {/* 其他 */}
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="mobile-web-app-capable" content="yes" />

            {/* 添加社交媒体平台的 meta */}
            <meta property="og:title" content={'Mingts|生字词学习'} />
            <meta property="og:description" content={'生字词学习卡片'} />

            <meta name="twitter:title" content={'Mingts|生字词学习'} />
            <meta name="twitter:description" content={'生字词学习卡片'} />

            {/* 更多社交媒体平台的 meta 标签 */}

            {/* 字节图标库 */}
            <script src="https://lf1-cdn-tos.bytegoofy.com/obj/iconpark/svg_28472_9.e60c033fea6e5ee20015cc00ec22c0fe.js" async></script>
        </Head>
    );
};

export default MyHead;
