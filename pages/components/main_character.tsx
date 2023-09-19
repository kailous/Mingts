// pages/components/main_character.tsx
// 生字列表组件

// 导入依赖
import React from 'react';
// 导入样式
import styles from '../css/main_character.module.css';
// 导入组件
import CardCharacter, { CharacterData } from './card_character'; // 生字卡片组件

// 定义 MainCharacter 组件的 props 类型
interface MainCharacterProps {
    characterData: CharacterData[];
    listenMode: boolean;
    isLoading: boolean;  // 新增 isLoading 属性
}

// 定义 MainCharacter 组件
const MainCharacter: React.FC<MainCharacterProps> = ({ characterData, listenMode, isLoading }) => {
    return (
        <div className={styles.maincharacter}>
            <h1>生字</h1>
            <div className={styles.list}>
                {isLoading ? ( // 根据 isLoading 判断是否显示加载状态
                    <p>Loading...</p>
                ) : (
                    characterData.length === 0 ? (
                        <p>没有需要学习的生字呢～</p>
                    ) : (
                        characterData.map((character, index) => (
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
