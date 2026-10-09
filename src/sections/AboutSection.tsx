import React from 'react'
import { getYearsOfExperience } from '../utils/time'
import Button from '../components/Button.tsx'
import AboutIllustration from '../components/AboutIllustration.tsx'
import styles from '../styles/Home.module.css'

const AboutSection = () => {
  const yearsOfExperience = getYearsOfExperience({
    filter: { fullTime: true }
  })

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
      id="about"
      className={styles.section}
      style={{ position: 'relative', top: '10px' }}>
      <Button onClick={downloadCV} className={styles.downloadCv}>
        Download CV
      </Button>

      <h2>About me</h2>
      <div className={styles.infoAbout}>
        <AboutIllustration className={styles.aboutIllustration} />
        <div>
          <div className={styles.paragraph}>
            <span>Full-stack developer with </span>
            <span className={styles.important}>{yearsOfExperience}+ years</span>
            <span> of experience</span>
          </div>

          <p>
            <span>I build web applications and backend services with </span>
            <span className={styles.important}>
              Vue.js, Nuxt.js, Node.js, TypeScript and PostgreSQL
            </span>
            <span>.</span>
          </p>

          <p>
            <span>I also build my own </span>
            <span className={styles.important}>web and mobile products</span>
            <span>, from development to deployment.</span>
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
