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
            lines={['Full-stack developer,', 'product-focused.']}
            secondLineClassName={styles.titleLineMuted}
          />
          <p className={styles.subtitle}>
            I build clean product interfaces, eCommerce platforms, and
            practical web/mobile applications with Vue, React Native,
            Node.js and TypeScript.
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
              <strong>React Native</strong>
              <span>mobile apps</span>
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
              <p>
                <span>const</span> developer = {'{'}
              </p>
              <p className={styles.codeIndent}>name: &apos;Aleix&apos;,</p>
              <p className={styles.codeIndent}>
                stack: [&apos;Vue.js&apos;, &apos;React Native&apos;,
                &apos;Node.js&apos;],
              </p>
              <p className={styles.codeIndent}>
                language: &apos;TypeScript&apos;,
              </p>
              <p className={styles.codeIndent}>
                focus: &apos;product interfaces&apos;
              </p>
              <p>{'}'}</p>
            </div>
          </div>
        </aside>
      </div>
    </header>
  )
}

export default Header
