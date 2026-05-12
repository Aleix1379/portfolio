import React from 'react'
import { getYearsOfExperience } from '../utils/time'
import HeroHeadline from './HeroHeadline'
import styles from '../styles/Header.module.css'

const Header = () => {
  const yearsOfExperience = getYearsOfExperience({
    filter: { fullTime: true }
  })

  return (
    <header id="header" className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.kicker}>Aleix Martínez Pena</p>
          <HeroHeadline
            className={styles.title}
            lineClassName={styles.titleLine}
            lines={["I'm Aleix.", 'Full-stack developer.']}
            secondLineClassName={styles.titleLineMuted}
          />
          <p className={styles.subtitle}>
            I build user interfaces and web/mobile apps with Vue.js/Nuxt.js,
            React Native, Node.js, and TypeScript.
          </p>

          <div className={styles.actions} aria-label="Hero actions">
            <a className={styles.primaryAction} href="#projects">
              View projects
            </a>
            <a className={styles.secondaryAction} href="#contact">
              Contact me
            </a>
          </div>

          <div className={styles.stats} aria-label="Portfolio highlights">
            <div className={styles.stat}>
              <strong>+{yearsOfExperience}</strong>
              <span>years of experience</span>
            </div>
            <div className={styles.stat}>
              <strong>Vue / Nuxt</strong>
              <span>eCommerce interfaces</span>
            </div>
            <div className={styles.stat}>
              <strong>Node.js</strong>
              <span>API and backend work</span>
            </div>
          </div>
        </div>

        <aside
          className={styles.visualShell}
          aria-label="Developer profile preview"
        >
          <div className={styles.visual}>
            <div className={styles.visualHeader}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className={styles.codeCard}>
              <p className={styles.codeLine}>
                <span>const</span> developer = {'{'}
              </p>
              <p className={`${styles.codeIndent} ${styles.codeLine}`}>
                name: &apos;Aleix&apos;,
              </p>
              <p className={`${styles.codeIndent} ${styles.codeLine}`}>
                stack: [&apos;Vue.js&apos;, &apos;Nuxt.js&apos;,
                &apos;Node.js&apos;],
              </p>
              <p className={`${styles.codeIndent} ${styles.codeLine}`}>
                language: &apos;TypeScript&apos;,
              </p>
              <p className={`${styles.codeIndent} ${styles.codeLine}`}>
                focus: &apos;user interfaces&apos;
              </p>
              <p className={styles.codeLine}>{'}'}</p>
            </div>
            <div className={styles.previewPanel}>
              <span>Recent work</span>
              <strong>TALKUAL eCommerce solutions</strong>
              <p>Vue.js/Nuxt.js, Strapi/Node.js</p>
            </div>
          </div>
        </aside>
      </div>
    </header>
  )
}

export default Header
