import React from 'react';
import styles from '../css/main_character.module.css';
import CardCharacter, { CharacterData } from './card_character';

interface MainCharacterProps {
    characterData: CharacterData[] | undefined; // Update type to allow undefined
    listenMode: boolean;
    loadingMode: boolean;   // 新增 loading 属性
}

const MainCharacter: React.FC<MainCharacterProps> = ({ characterData, listenMode,loadingMode }) => {
    console.log('loadingMode in MainCharacter:', loadingMode);
    return (
        <div className={styles.maincharacter}>
            <h1>生字</h1>
            <div className={styles.list}>
                {loadingMode === true ? (
                    <p>Loading...</p>
                ) : (
                    characterData && characterData.length === 0 ? (
                        <p>没有需要学习的生字呢～</p>
                    ) : (
                        characterData?.map((character, index) => (
                            <CardCharacter
                                key={index}
                                data={character}
                                listenMode={listenMode}
                            />
                        ))
                    )
                )}
            </div>
        </div>
    );
};

export default MainCharacter;
