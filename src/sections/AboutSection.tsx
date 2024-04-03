import React from 'react'
import { getYearsOfExperience } from '../utils/time'
import Button from '../components/Button.tsx'
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
    <section id="about" className={styles.section}>
      <Button onClick={downloadCV} className={styles.downloadCv}>
        Download CV
      </Button>

      <h2>About me</h2>
      <div className={styles.infoAbout}>
        <img
          src="/images/about.svg"
          alt="About"
          className={styles.image}
          width={800}
          height={300}
          loading={'eager'}
        />
        <div>
          <span className={styles.important}>
            <span>+ </span>
            <span>{yearsOfExperience}</span>
            <span> years </span>
          </span>
          <span> of experience as a full stack developer.</span>
          <p>Working with web and mobile apps using web technologies.</p>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
