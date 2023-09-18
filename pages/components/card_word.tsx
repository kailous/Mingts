import React from 'react';
import styles from '../css/card_word.module.css';

interface CardData {
    content: string;
    pinyin: any[]; // 这里根据实际情况定义 pinyin 的类型
    defn: string;
}

const CardWord = ({ data, listenMode }: { data: CardData, listenMode: boolean }) => {    // @ts-ignore
    if (!data || !data.content) {
        return null; // or handle the case where content is not defined
    }
    const { content, pinyin, defn } = data;

    // Function to play audio
    const playAudio = () => {
        const audio = new Audio(pinyin[0].pinyinLink);
        audio.play().then();
    }

    return (
        <div className={styles.card}>
            <h1>{listenMode ? '******' : content}</h1>
            <div className={styles.info}>
                <div className={styles.pinyin}>
                    <h2>{pinyin[0].pinyinText}</h2>
                    {pinyin[0].pinyinText !== 'none' && (
                        <button onClick={playAudio}>
                            <svg className="iconpark-icon">
                                <use href="#play"></use>
                            </svg>
                        </button>
                    )}
                </div>
                {
                    listenMode ? (
                        <p className={styles.shiyi}>
                            听写时没有提示呢，加油，你一定可以写好的～
                        </p>
                    ) : (
                        <p className={styles.shiyi}>
                            {defn ? defn : '恭喜你，你发现了一个新词，没有被收录呢～'}
                        </p>
                    )
                }
            </div>
        </div>
    );
};

export default CardWord;
