import React from 'react'
import styles from '../styles/Footer.module.css'

const Footer = () => (
  <footer>
    <div className={`content-container ${styles.content}`}>
      <a href="#header" className={styles.name} aria-label="Aleix, back to top">
        am.
      </a>
      <p className={styles.credit}>
        Designed &amp; built by{' '}
        <span className={styles.signature}>Aleix Martínez Pena</span>
      </p>
      <a href="#header" className={styles.backToTop}>
        Back to top <span aria-hidden="true">↑</span>
      </a>
    </div>
  </footer>
)

export default Footer
