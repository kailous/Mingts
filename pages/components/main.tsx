// pages/components/main.tsx
// 内容组件

// 导入依赖
import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
// 导入样式
import styles from '../css/main.module.css';
// 导入组件
import MainCharacter from './main_character'; // 生字列表组件
import MainWord from './main_word'; // 生词列表组件

// 定义 Main 组件的 props 类型
interface MainProps {
    listenMode: boolean; // 听写模式
}

interface CharacterDataType { // 生字数据类型
    type: string; // 类型
    gifurl: string; // 笔顺动态图地址
    pinyin: Pinyin[]; // 这里根据实际情况定义 pinyin 的类型
    defn: string; // 解释
    gow: string[]; // 词组
}

interface WordDataType { // 生词数据类型
    type: string; // 类型
    content: string; // 内容
    pinyin: Pinyin[]; // 这里根据实际情况定义 pinyin 的类型
    defn: string; // 解释
}

interface Pinyin { // 拼音数据类型
    pinyinText: string; // 拼音
    pinyinLink: string; // 读音链接
}

// 定义 Main 组件
const Main: React.FC<MainProps> = ({listenMode}) => {

    // 定义 isLoading 状态
    const [isLoading, setIsLoading] = useState(true);

    // 获取路由对象
    const router = useRouter();

    // 定义生字数据和生词数据
    const [characterData, setCharacterData] = useState<CharacterDataType[]>([]);
    const [wordData, setWordData] = useState<WordDataType[]>([]);

    // 监听路由对象的变化
    useEffect(() => {
        const {zi} = router.query;
        if (zi) {
            // 设置 isLoading 状态为 true
            setIsLoading(true);
            // 发起请求
            fetch(`/api/search?zi=${zi}`)
                // 将响应转换为 JSON 格式
                .then(response => response.json())
                // 处理数据
                .then(data => {
                    // 测试 CharacterData 是否正确
                    if (data && data.character && data.character.length > 0) {
                        // 设置生字数据
                        setCharacterData(data.character);
                    }
                    // 测试 WordData 是否正确
                    if (data && data.word && data.word.length > 0) {
                        // 设置生词数据
                        setWordData(data.word);
                    }
                    // 设置 isLoading 状态为 false
                    setIsLoading(false);
                })
                // 错误处理
                .catch(error => {
                    // 错误处理
                    console.error('Error fetching data:', error);
                    // 设置 isLoading 状态为 false
                    setIsLoading(false); // Ensure isLoading is set to false on error
                });
        }
    }, [router.query]);

    // 渲染 Main 组件
    return (
        <main className={styles.main}>
            {/* 生字 */}
            <MainCharacter // 生字列表组件
                characterData={characterData} // 传递生字数据
                listenMode={listenMode} // 传递听写模式
                isLoading={isLoading}  // 传递 isLoading
            />
            {/* 生词 */}
            <MainWord // 生词列表组件
                wordData={wordData} // 传递生词数据
                listenMode={listenMode} // 传递听写模式
                isLoading={isLoading}  // 传递 isLoading
            />
        </main>
    );
};

export default Main;
