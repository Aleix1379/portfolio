import React from 'react'
import styles from '../styles/Header.module.css'
import AboutIllustration from './AboutIllustration'
import ActionLink from './ActionLink'
import { getYearsOfExperience } from '../utils/time'
const Header = () => (
  <header id="header" className={styles.header} tabIndex={-1}>
    <div className={`${styles.content} content-container`}>
      <div className={styles.introduction}>
        <h1 className={styles.name}>I'm Aleix.</h1>
        <p className={styles.profession}>
          Full-stack developer building web and mobile products.
        </p>
        <p className={styles.description}>
          {getYearsOfExperience({ filter: { fullTime: true } })}+ years of
          experience in web development. I build applications, backend services
          and my own products—from development to deployment.
        </p>
        <div className={styles.actions}>
          <ActionLink href="#projects">View projects</ActionLink>
          <ActionLink href="#contact" variant="secondary">
            Get in touch
          </ActionLink>
        </div>
      </div>
      <AboutIllustration className={styles.illustration} />
    </div>
  </header>
)
export default Header
