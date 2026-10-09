import React from 'react'
import styles from '../styles/Header.module.css'

const Header = () => {
  return (
    <header id="header" className={styles.header}>
      <div className={styles.content}>
        <h1 className={styles.name}>I'm Aleix.</h1>
        <p className={styles.profession}>Full-stack developer</p>
        <p className={styles.description}>
          I build web applications and backend services.
        </p>
        <a className={styles.cta} href="#projects">
          View projects
        </a>
      </div>
    </header>
  )
}

export default Header
