import React, { type CSSProperties } from 'react'
import styles from '../styles/Footer.module.css'
import useReveal from '../hooks/useReveal'
import IconLink from './IconLink'

const EMAIL = 'aleixmp1379@gmail.com'

const Footer = () => {
  const footerRef = useReveal<HTMLElement>({ rootMargin: '0px 0px -8% 0px' })
  const revealDelay = (delay: number): CSSProperties =>
    ({ '--reveal-delay': `${delay}ms` }) as CSSProperties

  return (
    <footer ref={footerRef} className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand} data-reveal style={revealDelay(0)}>
          <p className={styles.title}>Aleix Martínez Pena</p>
          <p className={styles.role}>
            Full-stack web developer · product applications
          </p>
        </div>

        <div className={styles.links} data-reveal style={revealDelay(90)}>
          <IconLink
            link={{ url: `mailto:${EMAIL}`, text: 'Email', icon: 'email' }}
            variant="action"
            className={styles.link}
          />
          <IconLink
            link={{
              url: 'https://www.linkedin.com/in/aleixmp/',
              text: 'LinkedIn',
              icon: 'linkedin'
            }}
            variant="action"
            className={styles.link}
          />
          <IconLink
            link={{
              url: 'https://github.com/Aleix1379',
              text: 'GitHub',
              icon: 'github'
            }}
            variant="action"
            className={styles.link}
          />
        </div>

        <p className={styles.copyright} data-reveal style={revealDelay(150)}>
          © {new Date().getFullYear()} Aleix Martínez Pena
        </p>
      </div>
    </footer>
  )
}

export default Footer
