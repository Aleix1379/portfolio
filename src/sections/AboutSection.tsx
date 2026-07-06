import React, { type CSSProperties } from 'react'
import { getYearsOfExperience } from '../utils/time'
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

  const downloadCV = async () => {
    const response = await fetch('/cv.pdf')
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.download = 'cv.pdf'
    document.body.appendChild(a)
    a.click()
    a.remove()
    window.URL.revokeObjectURL(url)
  }

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
          Web developer focused on user interfaces, eCommerce platforms, and
          practical web/mobile applications.
        </p>
      </div>

      <div className={styles.aboutGrid}>
        <div className={styles.aboutCopy} data-reveal style={revealDelay(260)}>
          <p className={styles.aboutBio}>
            I&apos;m Aleix, a full-stack developer with{' '}
            <span className={styles.important}>
              +{yearsOfExperience} years
            </span>{' '}
            of experience shipping production software — from eCommerce
            platforms to mobile apps. I care about clean interfaces, sound
            architecture, and building features that solve real problems for
            the people using them.
          </p>

          <div className={styles.aboutFooter}>
            <div className={styles.aboutChips} aria-label="Core technologies">
              <Chip>Vue.js / Nuxt.js</Chip>
              <Chip>React Native</Chip>
              <Chip>Node.js</Chip>
              <Chip>TypeScript</Chip>
            </div>

            <Button
              onClick={downloadCV}
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
          <div className={styles.aboutFact}>
            <span>Focus</span>
            <strong>
              Product interfaces, eCommerce platforms, and web/mobile apps
            </strong>
          </div>
          <div className={styles.aboutFact}>
            <span>Experience</span>
            <strong>
              +{yearsOfExperience} years across full-stack, front-end, and
              mobile roles
            </strong>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default AboutSection
