import React from 'react'
import styles from '../styles/AboutSection.module.css'

const AboutSection = () => (
  <section
    id="about"
    tabIndex={-1}
    aria-labelledby="about-heading"
    className={`portfolio-section content-container ${styles.section}`}
  >
    <div className={styles.heading}>
      <p className={styles.eyebrow}>A LITTLE ABOUT ME</p>
      <h2 id="about-heading">
        From an idea
        <br />
        to a working product.
      </h2>
    </div>
    <div className={styles.copy}>
      <p>
        I enjoy connecting the different parts of a product: the interface
        people use, the data it depends on and the services that keep it
        running. My work has included commerce, subscriptions, logistics
        integrations and mobile applications.
      </p>
      <p>
        Building my own products gives me room to explore ideas and work through
        the whole process, from development to deployment. I bring that
        practical perspective to teams, collaborating on design and turning
        requirements into working software.
      </p>
    </div>
  </section>
)

export default AboutSection
