import React, { type CSSProperties } from 'react'
import { getYearsOfExperience } from '../utils/time'
import { downloadCv } from '../utils/downloadCv.ts'
import Button from '../components/Button.tsx'
import Chip from '../components/Chip.tsx'
import useReveal from '../hooks/useReveal.ts'
import styles from '../styles/Home.module.css'

const AboutSection = () => {
  const yearsOfExperience = getYearsOfExperience({
    filter: { fullTime: true }
  })
  const sectionRef = useReveal<HTMLElement>()
  const revealDelay = (delay: number): CSSProperties =>
    ({ '--reveal-delay': `${delay}ms` }) as CSSProperties

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`${styles.section} ${styles.aboutSection}`}
    >
      <div className={styles.sectionHeader}>
        <span className={styles.eyebrow} data-reveal style={revealDelay(0)}>
          PROFILE
        </span>
        <h2 data-reveal style={revealDelay(90)}>
          About me
        </h2>
        <p className={styles.sectionLead} data-reveal style={revealDelay(180)}>
          Full-stack development for product teams — from frontend
          implementation to backend services and data layers.
        </p>
      </div>

      <div className={styles.aboutGrid}>
        <div
          className={`${styles.card} ${styles.aboutCopy}`}
          data-reveal
          style={revealDelay(260)}
        >
          <p className={styles.aboutBio}>
            I&apos;m a full-stack web developer with recent professional
            experience building Vue/Nuxt applications, Node.js services and
            PostgreSQL-backed platforms.
          </p>
          <p className={styles.aboutBio}>
            Alongside my professional work, I build my own web and mobile
            products to explore backend architecture, deployment, product
            decisions and end-to-end development.
          </p>

          <div className={styles.aboutFooter}>
            <div className={styles.aboutChips} aria-label="Core technologies">
              <Chip>Vue.js / Nuxt.js</Chip>
              <Chip>Node.js</Chip>
              <Chip>TypeScript</Chip>
              <Chip>PostgreSQL</Chip>
            </div>

            <Button
              onClick={() => {
                void downloadCv()
              }}
              className={`${styles.downloadCv} ${styles.sectionButton}`}
            >
              Download CV
            </Button>
          </div>
        </div>

        <aside
          className={styles.aboutFacts}
          aria-label="About highlights"
          data-reveal
          style={revealDelay(360)}
        >
          <div className={styles.factCard}>
            <span className={styles.factCardLabel}>Focus</span>
            <strong className={styles.factCardValue}>
              Product applications, web platforms, frontend/full-stack
              development.
            </strong>
          </div>
          <div className={styles.factCard}>
            <span className={styles.factCardLabel}>Experience</span>
            <strong className={styles.factCardValue}>
              +{yearsOfExperience} years across web, frontend and full-stack
              roles.
            </strong>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default AboutSection
