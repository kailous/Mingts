import React from 'react';
import styles from '../css/card_word.module.css';

interface CardWordProps {
    data: CardWordData; // Replace with the actual type of characterData
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
export type { CardWordData };  // Use 'export type' to re-export the type
const CardWord: React.FC<CardWordProps> = ({ data, listenMode }) => {

// const CardWord = ({ data, listenMode }: { data: CardData, listenMode: boolean }) => {    // @ts-ignore
    if (!data || !data.content) {
        return null; // or handle the case where content is not defined
    }
    const { content, pinyin, defn } = data;
    const audioUrls = pinyin.map((item) => item.pinyinLink).filter((url) => url && url !== 'none');
    const hasAudio = audioUrls.length > 0;

    // Function to play audio
    const playAudio = async () => {
        if (!hasAudio) {
            return;
        }

        for (const audioUrl of audioUrls) {
            const audio = new Audio(audioUrl);
            await new Promise<void>((resolve) => {
                audio.onended = () => resolve();
                audio.onerror = () => resolve();
                audio.play().catch(() => resolve());
            });
        }
    }

    return (
        <div
            className={hasAudio ? `${styles.card} ${styles.clickable}` : styles.card}
            onClick={playAudio}
        >
            <h1>{listenMode ? '******' : content}</h1>
            <div className={styles.info}>
                <div className={styles.pinyin}>
                    <h2>{pinyin[0].pinyinText}</h2>
                    {hasAudio && (
                        <button onClick={(event) => {
                            event.stopPropagation();
                            playAudio();
                        }}>
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
