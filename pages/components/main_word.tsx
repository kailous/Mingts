import React from 'react';
import styles from '../css/main_word.module.css';
import CardWord from './card_word';
interface MainWordProps {
    wordData: CardWordData[]; // Replace with the actual type of characterData
    listenMode: boolean;
}
interface CardWordData {
    content: string;
    pinyin: Pinyin[]; // 这里根据实际情况定义 pinyin 的类型
    defn: string;
}
interface Pinyin {
    pinyinText: string;
    pinyinLink: string;
}
const MainWord: React.FC<MainWordProps> = ({ wordData, listenMode }) => {

    return (
        <div className={styles.mainword}>
            <h1>生词</h1>
            <div className={styles.list}>
                {wordData.length === 0 ? (
                    <p>没有需要学习的单词哦～</p>
                ) : (
                    wordData.map((word, index) => (
                        <CardWord
                            key={index}
                            data={word}
                            listenMode={listenMode}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default MainWord;

