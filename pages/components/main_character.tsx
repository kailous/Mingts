import React from 'react';
import styles from '../css/main_character.module.css';
import CardCharacter, { CardData } from './card_character';

interface MainCharacterProps {
    characterData: CardData[]; // Replace with the actual type of characterData
    listenMode: boolean;
}

const MainCharacter: React.FC<MainCharacterProps> = ({ characterData, listenMode }) => {
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
                            listenMode={listenMode}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default MainCharacter;
