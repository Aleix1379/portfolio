import React from 'react'
import { getYearsOfExperience } from '../utils/time'
import Chip from './Chip'
import HeroHeadline from './HeroHeadline'
import badgeStyles from '../styles/Badge.module.css'
import styles from '../styles/Header.module.css'

const Header = () => {
  const yearsOfExperience = getYearsOfExperience({
    filter: { fullTime: true }
  })

  return (
    <header id="header" className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <Chip variant="kicker" className={styles.kicker}>
            Aleix Martínez Pena
          </Chip>
          <HeroHeadline
            className={styles.title}
            lineClassName={styles.titleLine}
            lines={['Product-focused', 'full-stack developer.']}
            secondLineClassName={styles.titleLineMuted}
          />
          <p className={styles.subtitle}>
            I build maintainable web apps, backend services and mobile products
            with Vue/Nuxt, Node.js, TypeScript and PostgreSQL.
          </p>

          <div className={styles.actions} aria-label="Hero actions">
            <a className={styles.primaryAction} href="#projects">
              <span className={badgeStyles.badgeTrack}>
                <span className={badgeStyles.badgeLabel}>View projects</span>
              </span>
            </a>
          </div>

          <Chip variant="note" className={styles.availabilityBadge}>
            Open to product-focused frontend/full-stack roles.
          </Chip>

          <div className={styles.stats} aria-label="Portfolio highlights">
            <div className={`${styles.stat} ${styles.statFeatured}`}>
              <div className={styles.statValue}>
                <span className={styles.statNumber}>+{yearsOfExperience}</span>
              </div>
              <p className={styles.statCaptionSplit}>
                <span>years of</span>
                <span>experience</span>
              </p>
            </div>
            <div className={styles.stat}>
              <Chip variant="stat">Vue / Nuxt</Chip>
              <span className={styles.statCaption}>product web apps</span>
            </div>
            <div className={styles.stat}>
              <Chip variant="stat">Node.js</Chip>
              <span className={styles.statCaption}>backend services</span>
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
                stack: [&apos;Vue/Nuxt&apos;, &apos;Node.js&apos;,
                &apos;TypeScript&apos;],
              </p>
              <p className={styles.codeIndent}>
                database: &apos;PostgreSQL&apos;,
              </p>
              <p className={styles.codeIndent}>
                focus: &apos;product apps&apos;
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
