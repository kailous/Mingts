import React from 'react';
import styles from '../css/footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.info}>
                <svg className={`${styles.icon} ${styles.logo}`}>
                    <use href="#logo-h"></use>
                </svg>
                <svg className={`${styles.icon} ${styles.by}`}>
                    <use href="#by"></use>
                </svg>
            </div>
            <div className={styles.statement}>
                <div className={styles.text}>
                    <h3>免责声明：</h3>
                    <p>本程序的目的旨在更好地帮助小学生学习生字词。所有数据来源于百度汉语。然而，数据的准确性和及时性可能受限于百度汉语网站内容的更新速度和可访问性。本程序不保证数据的完整性、准确性或适用性。用户应自行判断和使用这些数据，特别是在教育环境中。开发者对于用户使用本程序可能导致的任何直接或间接损失概不负责。</p>
                </div>
                <div className={styles.text}>
                    <h3>注意事项：</h3>
                    <p>请注意，尽管本程序的目的是帮助小学生学习生字词，但最终用户需要谨慎使用数据并适应个人学习需求。本程序提供的数据仅供参考，不构成任何具体建议或保证。用户需自行承担使用本程序数据的风险。使用本程序即表示同意免除开发者对任何因使用数据而导致的损失的责任，且用户需合法使用本程序及其提供的数据，遵守相关法律法规和伦理准则。</p>
                </div>
            </div>
            <div className={styles.stacklogo}>
                <svg className={`${styles.icon} ${styles.next}`}>
                    <use href="#next-ahid041c"></use>
                </svg>
                <svg className={`${styles.icon} ${styles.vercel}`}>
                    <use href="#vercel-ahid041c"></use>
                </svg>
                <svg className={`${styles.icon} ${styles.github}`}>
                    <use href="#Github"></use>
                </svg>
            </div>
        </footer>
    )
}
export default Footer;