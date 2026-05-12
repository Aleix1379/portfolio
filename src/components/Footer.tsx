import React, { type CSSProperties } from 'react'
import styles from '../styles/Footer.module.css'
import useReveal from '../hooks/useReveal'

const Footer = () => {
  const footerRef = useReveal<HTMLElement>({ rootMargin: '0px 0px -8% 0px' })
  const revealDelay = (delay: number): CSSProperties =>
    ({ '--reveal-delay': `${delay}ms` }) as CSSProperties

  return (
    <footer ref={footerRef} className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand} data-reveal style={revealDelay(0)}>
          <p className={styles.title}>Aleix Martínez Pena</p>
          <p className={styles.role}>Web Developer</p>
        </div>

        <div className={styles.meta} data-reveal style={revealDelay(90)}>
          <span>Designed & built by Aleix Martínez Pena</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
