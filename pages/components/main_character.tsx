import React, {useEffect} from 'react';
import styles from '../css/main_character.module.css';
import CardCharacter from './card_character';
interface MainCharacterProps {
    characterData: YourCharacterDataType; // Replace with the actual type of characterData
    onListen: Function;
    listenMode: boolean;
    setListenMode: Function;
    onListenModeChange: Function;
}
const MainCharacter: React.FC<MainCharacterProps> = ({ characterData, onListen, listenMode, setListenMode, onListenModeChange }) => {
    const handleListenModeChange = (mode) => {
        setListenMode(mode);
        console.log('main_character测试listenMode:', mode);
    };

    useEffect(() => {
        console.log('main_character测试listenMode:', listenMode);
    }, [listenMode]);

    return (
        <div className={styles.maincharacter}>
            <h1>生字</h1>
            <div className={styles.list}>
                {characterData.length === 0 ? (
                    <p>没有需要学习的生字呢～</p>
                ) : (
                    characterData.map((character, index) => (
                        <CardCharacter
                            key={index}
                            data={character}
                            onListen={onListen}
                            setListenMode={setListenMode}
                            listenMode={listenMode}
                            onListenModeChange={handleListenModeChange}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default MainCharacter;
