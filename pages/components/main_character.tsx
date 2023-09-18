import React from 'react';
import styles from '../css/main_character.module.css';
import CardCharacter, { CharacterData } from './card_character';

interface MainCharacterProps {
    characterData: CharacterData[]; // Assuming characterData is an array of CharacterData
    listenMode: boolean;
}

const MainCharacter: React.FC<MainCharacterProps> = ({ characterData, listenMode }) => {
    return (
        <div className={styles.maincharacter}>
            <h1>生字</h1>
            <div className={styles.list}>
                {characterData && characterData.length === 0 ? (
                    <p>没有需要学习的生字呢～</p>
                ) : (
                    characterData.map((character, index) => (
                        <CardCharacter
                            key={index}
                            data={character}
                            listenMode={listenMode}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default MainCharacter;