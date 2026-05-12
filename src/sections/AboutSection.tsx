import React, { type CSSProperties } from 'react'
import { getYearsOfExperience } from '../utils/time'
import Button from '../components/Button.tsx'
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
          Web developer focused on eCommerce solutions, personal projects, and
          practical product experiences.
        </p>
      </div>

      <div className={styles.aboutGrid}>
        <div className={styles.aboutCopy} data-reveal style={revealDelay(260)}>
          <div className={styles.aboutCopyInner}>
            <p className={styles.aboutLead}>
              <strong>+{yearsOfExperience}</strong> years of experience as a web
              developer
            </p>
            <p>
              <span>Experience includes TALKUAL eCommerce solutions with </span>
              <span className={styles.important}>Vue.js/Nuxt.js</span>
              <span> and </span>
              <span className={styles.important}>Strapi/Node.js</span>
            </p>
          </div>

          <div className={styles.aboutFooter}>
            <div className={styles.aboutChips} aria-label="Main technologies">
              <span>Vue.js/Nuxt.js</span>
              <span>Strapi/Node.js</span>
              <span>React Native</span>
              <span>TypeScript</span>
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
          className={styles.aboutPanel}
          aria-label="About highlights"
          data-reveal
          style={revealDelay(360)}
        >
          <img
            src="/images/about.svg"
            alt="About"
            className={styles.image}
            width={800}
            height={300}
            loading={'eager'}
          />
          <div className={styles.aboutStats}>
            <div className={styles.aboutStat}>
              <span>Current work</span>
              <strong>TALKUAL eCommerce solutions</strong>
            </div>
            <div className={styles.aboutStat}>
              <span>Main stack</span>
              <strong>Vue.js/Nuxt.js, React Native, TypeScript, Node.js</strong>
            </div>
            <div className={styles.aboutStat}>
              <span>Current focus</span>
              <strong>
                eCommerce solutions and practical product experience
              </strong>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default AboutSection
