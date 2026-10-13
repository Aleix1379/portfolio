import React from 'react'
import styles from '../styles/Header.module.css'
import AboutIllustration from './AboutIllustration'
import ActionLink from './ActionLink'
const Header = () => (
  <header id="header" className={styles.header} tabIndex={-1}>
    <div className={`${styles.content} content-container`}>
      <div className={styles.introduction}>
        <h1 className={styles.name}>I'm Aleix.</h1>
        <p className={styles.profession}>
          Full-stack developer building web and mobile products.
        </p>
        <div className={styles.description}>
          <p>
            About nine years of professional experience. My most recent work
            focused on eCommerce with Vue.js, Nuxt.js, Node.js and PostgreSQL.
          </p>
          <p>I also build my own web and mobile products.</p>
        </div>
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
