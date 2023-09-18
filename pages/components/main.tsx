import React, { useEffect, useState } from 'react';
import styles from '../css/main.module.css';
import MainCharacter from './main_character';
import MainWord from './main_word';
import { useRouter } from 'next/router';

interface MainProps {
    onListen: Function;  // 这里可以根据实际函数签名调整类型
    listenMode: boolean;
    setListenMode: Function;  // 这里可以根据实际函数签名调整类型
    onListenModeChange: Function;  // 这里可以根据实际函数签名调整类型
}
const Main: React.FC<MainProps> = ({ onListen, listenMode, setListenMode, onListenModeChange }) => {
    const router = useRouter();
    const [characterData, setCharacterData] = useState([]);
    const [wordData, setWordData] = useState([]);
    // @ts-ignore
    const handleListenModeChange = (mode) => {
        setListenMode(mode);
        console.log('main测试listenMode:', mode);
    }
    // 测试listenMode传递
    useEffect(() => {
        console.log('main测试listenMode:', listenMode);
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
    }, [router.query,listenMode]);

    return (
        <main className={styles.main}>
            <MainCharacter
                characterData={characterData}
                // @ts-ignore
                onListen={onListen}
                setListenMode={setListenMode} // Pass setListenMode as prop
                listenMode={listenMode}
                onListenModeChange={handleListenModeChange}
            />
            <MainWord
                wordData={wordData}
                // @ts-ignore
                onListen={onListen}
                setListenMode={setListenMode} // Pass setListenMode as prop
                listenMode={listenMode}
                onListenModeChange={handleListenModeChange}
            />
        </main>
    );
};

export default Main;
