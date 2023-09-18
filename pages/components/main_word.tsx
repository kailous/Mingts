import React from 'react';
import styles from '../css/main_word.module.css';
import CardWord, { CardData } from './card_word';
interface MainWordProps {
    wordData: CardData[]; // Replace with the actual type of characterData
    listenMode: boolean;
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

