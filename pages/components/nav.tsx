import React from 'react';
import styles from '../css/nav.module.css';

interface NavProps {
    textareaContent: any;
}
// @ts-ignore
const Navigation: React.FC<NavProps> = ({ textareaContent, listenMode, onListenModeChange }) => {
    const onStudy = () => {
        window.open(`/?zi=${encodeURIComponent(textareaContent)}`, '_self');
    }

    const onListen = () => {
        // Toggle listenMode on button click
        onListenModeChange(!listenMode);
    }

    const onReset = () => {
        window.open('/', '_self');
    }

    // @ts-ignore
    return (
        <nav className={styles.nav}>
            <div className={styles.left}>
                <button
                    className={listenMode ? styles.study : styles.high}
                    onClick={listenMode ? null : onStudy}
                >
                    <svg className="iconpark-icon">
                        <use href="#study"></use>
                    </svg>
                    <p>{listenMode ? '听写中' : '开始学习'}</p>
                </button>
                <button onClick={onListen} className={listenMode ? styles.high : styles.listen} >
                    <svg className="iconpark-icon">
                        <use href="#listen"></use>
                    </svg>
                    <p>{listenMode ? '结束听写' : '听写'}</p>
                </button>
            </div>
            <div className={styles.right}>
                <button onClick={onReset} className={styles.reset}>
                    <svg className="iconpark-icon">
                        <use href="#reset"></use>
                    </svg>
                </button>
            </div>
        </nav>
    );
};

export default Navigation;
