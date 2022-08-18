import styles from "../styles/Header.module.css";

const Header = () => {
    return (
        <div id="header" className={styles.header}>
            <div>
                <h2 className={`${styles.name} ${styles.text}`}>I'm Aleix.</h2>
                <h2 className={`${styles.job} ${styles.text}`}>A front end developer.</h2>
            </div>
        </div>
    )
}

export default Header
