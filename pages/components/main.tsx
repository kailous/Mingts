import React, { useEffect, useState } from 'react';
import styles from '../css/main.module.css';
import MainCharacter from './main_character';
import MainWord from './main_word';
import { useRouter } from 'next/router';

interface MainProps {
    listenMode: boolean;
}
const Main: React.FC<MainProps> = ({ listenMode }) => {
    const router = useRouter();
    const [characterData, setCharacterData] = useState([]);
    const [wordData, setWordData] = useState([]);

    // 测试listenMode传递
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

    // @ts-ignore
    // @ts-ignore
    return (
        <main className={styles.main}>
            <MainCharacter
                characterData={characterData}
                // @ts-ignore
                listenMode={listenMode}
            />
            <MainWord
                // @ts-ignore
                wordData={wordData}
                // @ts-ignore
                listenMode={listenMode}
            />
        </main>
    );
};

export default Main;
