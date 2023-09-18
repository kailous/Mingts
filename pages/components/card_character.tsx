import React, { useEffect, useState } from 'react';
import styles from '../css/card_character.module.css';

interface CardData {
    gifurl: string;
    pinyin: any[]; // 这里根据实际情况定义 pinyin 的类型
    defn: string;
    gow: string[];
}

const CardCharacter = ({ data, listenMode }: { data: CardData, listenMode: boolean }) => {
    const [isSafari, setIsSafari] = useState(false);

    useEffect(() => {
        // 检测是否为 Safari 浏览器
        const isSafariBrowser = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        setIsSafari(isSafariBrowser);
    }, []);
    // const handleListenModeChange = (mode) => {
    //     setListenMode(mode);
    //     console.log('main_character测试listenMode:', mode);
    // }

    const { gifurl, pinyin, defn, gow } = data;

    const handlePlayAudio = (audioUrl) => {
        const audio = new Audio(audioUrl);
        audio.play();
    };

    return (
        <div className={styles.card}>
            <div className={styles.bihua}>
                <div
                    className={isSafari ? styles.safari_img : styles.img}
                    style={{
                        backgroundImage: listenMode ? 'url(./dictation_bihua.png)' : `url(${gifurl})`,
                    }}
                />
                <ul className={styles.pinyin}>
                    {pinyin.map((py, index) => (
                        <li key={index}>
                            <button onClick={() => handlePlayAudio(py.pinyinLink)}>
                                <p>{py.pinyinText}</p>
                                <svg className="iconpark-icon">
                                    <use href="#play"></use>
                                </svg>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.info}>
                {
                    listenMode ? (
                        <p className={styles.shiyi}>
                            听写时没有提示呢，加油，你一定可以写好的～
                        </p>
                    ) : (
                        <p className={styles.shiyi}>
                            {defn ? defn : '这个字不好解释，暂时还没有收录释义呢～'}
                        </p>
                    )
                }
                <ul className={styles.zuci}>
                    {listenMode ? (
                        <li>听写时看不到组词哦～</li>
                    ) : (
                        gow.map((word, index) => (
                            <li key={index}>{word}</li>
                        ))
                    )}
                </ul>

            </div>
        </div>
    );
}

export default CardCharacter;
