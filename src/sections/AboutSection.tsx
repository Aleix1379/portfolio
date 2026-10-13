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
        I enjoy working across a product, from the interface people use to the
        services behind it.
      </p>
      <p>
        At Talkual, I worked on an eCommerce platform with
        Vue.js and Nuxt.js, backed by Node.js, Strapi and PostgreSQL. This included
        recurring payments, automatic subscription renewals and delivery
        integrations.
      </p>
      <p>
        My personal projects give me room to explore web and mobile development
        and take an idea through to deployment.
      </p>
      <p>
        In teams, I enjoy turning
        requests into working features, collaborating on design and checking
        changes with tests.
      </p>
    </div>
  </section>
)

export default AboutSection
