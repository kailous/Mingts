import React, { useState } from 'react';

// 加载组件
import MyHead from "./components/head";
import Header from "./components/header";
import Main from "./components/main";
import Footer from "./components/footer";

const MyPage: React.FC = () => {
    // 创建一个loading状态
    const [loadingMode, setLoadingMode] = useState(false);
    const [listenMode, setListenMode] = useState(false);

    // 处理 listenMode 变化的回调函数
    // @ts-ignore // 忽略类型检查
    const handleListenModeChange = (mode) => {
        setListenMode(mode);
        setLoadingMode(mode);
    };

    const onLoadingTrue = () => {
        // 初始化 loading 状态
        setLoadingMode(true);

    }
    const onLoadingFalse = () => {
        // 初始化 loading 状态
        setLoadingMode(false);

    }

    // 处理听写按钮点击
    const onListen = () => {
        if (listenMode) {
            // 如果已经是听写模式，切换到非听写模式
            handleListenModeChange(false);
        } else {
            // 如果不是听写模式，切换到听写模式
            handleListenModeChange(true);
        }
    };

    return (
        <>

            <MyHead />

            <Header
                // @ts-ignore // 忽略类型检查
                onListen={onListen}
                listenMode={listenMode}
                setListenMode={setListenMode}
            />
            <Main
                // @ts-ignore // 忽略类型检查
                onListen={onListen}
                listenMode={listenMode}
                onLoadingTrue={onLoadingTrue}
                onLoadingFalse={onLoadingFalse}
                loadingMode={loadingMode}
                setLoadingMode={setLoadingMode}

            />
            <Footer />
        </>
    );
};

export default MyPage;
