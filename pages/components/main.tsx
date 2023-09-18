import React, { useEffect, useState } from 'react';
import styles from '../css/main.module.css';
import MainCharacter from './main_character';
import MainWord from './main_word';
import { useRouter } from 'next/router';

interface MainProps {
    listenMode: boolean;
}
interface WordDataType {
    type: string;
    content: string;
    pinyin: any[]; // 这里根据实际情况定义 pinyin 的类型
    defn: string;
}
interface CharacterDataType {
    type: string;
    gifurl: string;
    pinyin: any[]; // 这里根据实际情况定义 pinyin 的类型
    defn: string;
    gow: string[];
}
const Main: React.FC<MainProps> = ({ listenMode }) => {
    const router = useRouter();
    const [characterData, setCharacterData] = useState<CharacterDataType[]>([]);
    const [wordData, setWordData] = useState<WordDataType[]>([]);

    useEffect(() => {
        const { zi } = router.query;
        if (zi) {
            fetch(`/api/search?zi=${zi}`)
                .then(response => response.json())
                .then(data => {
                    if (data && data.character && data.character.length > 0) {
                        setCharacterData(data.character);
                    }
                    if (data && data.word && data.word.length > 0) {
                        setWordData(data.word);
                    }
                })
                .catch(error => console.error('Error fetching data:', error));
        }
    }, [router.query]);

    return (
        <main className={styles.main}>
            <MainCharacter
                characterData={characterData}
                listenMode={listenMode}
            />
            <MainWord
                wordData={wordData}
                listenMode={listenMode}
            />
        </main>
    );
};

export default Main;
