import React, { useState } from 'react';
import styles from '../css/myheader.module.css';
import Navigation from './nav';

// @ts-ignore // 忽略类型检查
const Header = ({ onListen,listenMode,setListenMode }) => {
    const [textareaContent, setTextareaContent] = useState('');

    // @ts-ignore // 忽略类型检查 // 测试listenMode传递
    const handleListenModeChange = (mode) => {
        setListenMode(mode);
    }
    // @ts-ignore
    const handleTextareaChange = (event) => {
        setTextareaContent(event.target.value);
    };

    const handleStudy = () => {
        if (textareaContent) {
            window.open(`/?zi=${encodeURIComponent(textareaContent)}`, '_self');
        } else {
            alert('请输入要学习的文字内容。');
        }
    }

    // @ts-ignore
    const handleTextareaKeyDown = (event) => {
        if (event.metaKey && event.key === 'Enter') {
            event.preventDefault();
            handleStudy();
        }
    };

    // @ts-ignore
    return (
        <div className={styles.header}>
            <svg className="iconpark-icon">
                <use href="#logo-v"></use>
            </svg>
            <textarea
                // @ts-ignore
                rows="2"
                id="search"
                placeholder="在此输入需要学习的字或者词组&#13;&#10;用空格分开"
                value={textareaContent}
                onChange={handleTextareaChange}
                onKeyDown={handleTextareaKeyDown}
                style={{ display: listenMode ? 'none' : 'block' }}
            />
            <Navigation
                // @ts-ignore
                onListen={onListen}
                listenMode={listenMode}
                textareaContent={textareaContent}
                onListenModeChange={handleListenModeChange}
                onStudy={handleStudy}
            />
        </div>
    );
};

export default Header;
