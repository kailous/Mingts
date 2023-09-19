// pages/components/main_character.tsx
// 生词列表组件

// 导入依赖
import React from 'react';
// 导入样式
import styles from '../css/main_word.module.css';
// 导入组件
import CardWord, { CardWordData } from './card_word'; // 生词卡片组件

// 定义 MainWord 组件的 props 类型
interface MainWordProps {
    wordData: CardWordData[]; // 生词数据
    listenMode: boolean; // 听写模式
    isLoading: boolean;  // 新增 isLoading 属性
}

// 定义 MainWord 组件
const MainWord: React.FC<MainWordProps> = ({ wordData, listenMode, isLoading }) => {
    // 测试 isLoading 传递是否正确，在控制台输出
    console.log("isLoading", isLoading);
    return (
        <div className={styles.mainword}>
            <h1>生词</h1>
            <div className={styles.list}>
                {isLoading ? ( // 根据 isLoading 判断是否显示加载状态
                    <p>Loading...</p>
                ) : (
                    wordData.length === 0 ? (
                        <p>没有需要学习的单词哦～</p>
                    ) : (
                        wordData.map((word, index) => (
                            <CardWord
                                key={index}
                                data={word}
                                listenMode={listenMode}
                            />
                        ))
                    )
                )}
            </div>
        </div>
    );
};

export default MainWord;
