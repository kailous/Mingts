// pages/index.tsx
// 主页面组件

// 导入依赖
import React, { useState } from 'react';
// 加载组件
import MyHead from "./components/head";
import Header from "./components/header";
import Main from "./components/main";

// 定义 Header 组件的 props 类型
// interface HeaderProps {
//     onListen: () => void;
//     listenMode: boolean;
//     setListenMode: React.Dispatch<React.SetStateAction<boolean>>;
// }

// 定义 MyPage 组件
const MyPage: React.FC = () => {

    // 定义 listenMode 状态
    const [listenMode, setListenMode] = useState(false);

    // 处理听写按钮点击
    const onListen = () => {
        if (listenMode) {
            // 如果已经是听写模式，切换到非听写模式
            setListenMode(false);
        } else {
            // 如果不是听写模式，切换到听写模式
            setListenMode(true);
        }
    };

    return (
        <>
            <MyHead />

            <Header
                onListen={onListen}
                listenMode={listenMode}
                setListenMode={setListenMode}
            />
            <Main
                onListen={onListen}
                listenMode={listenMode}
            />
        </>
    );
};

export default MyPage;
