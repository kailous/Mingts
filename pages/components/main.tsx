import React, { useEffect, useState } from 'react';
import styles from '../css/main.module.css';
import MainCharacter from './main_character';
import MainWord from './main_word';
import { useRouter } from 'next/router';

interface MainProps {
    listenMode: boolean;
    loadingMode: boolean;  // 新增 loading 属性
    onLoadingTrue: () => void;
    onLoadingFalse: () => void;
}
interface WordDataType {
    type: string;
    content: string;
    pinyin: any[]; // 这里根据实际情况定义 pinyin 的类型
    defn: string;
    listenMode: boolean;
    loadingMode: boolean;  // 新增 loading 属性
}
interface CharacterDataType {
    type: string;
    gifurl: string;
    pinyin: any[]; // 这里根据实际情况定义 pinyin 的类型
    defn: string;
    gow: string[];
    listenMode: boolean;
    loadingMode: boolean;   // 新增 loading 属性
}
const Main: React.FC<MainProps> = ({ listenMode,loadingMode ,onLoadingTrue,onLoadingFalse}) => {
    const router = useRouter();
    const [characterData, setCharacterData] = useState<CharacterDataType[]>([]);
    const [wordData, setWordData] = useState<WordDataType[]>([]);


    useEffect(() => {
        const { zi } = router.query;
        if (zi) {
            // 触发 onLoadingTrue 函数
            onLoadingTrue();

            // 新的请求配置，使用POST请求，将zi作为请求体参数
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ zi }),
            };

            fetch(`/api/search`, requestOptions)  // 发起POST请求
                .then(response => response.json())
                .then(data => {
                    if (data && data.character && data.character.length > 0) {
                        setCharacterData(data.character);
                    }
                    if (data && data.word && data.word.length > 0) {
                        setWordData(data.word);
                    }
                    // 触发 onLoadingFalse 函数
                    onLoadingFalse();
                })
                .catch(error => {
                    console.error(error);
                    // 触发 onLoadingFalse 函数
                    onLoadingFalse();
                });
        }
    }, [router.query]);

    return (
        <main className={styles.main}>

            <MainCharacter
                characterData={characterData}
                listenMode={listenMode}
                loadingMode={loadingMode}
            />
            <MainWord
                wordData={wordData}
                listenMode={listenMode}
                loadingMode={loadingMode}
            />

        </main>

    );
};

export default Main;
