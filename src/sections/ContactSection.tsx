import React, { type CSSProperties } from 'react'
import IconLink from '../components/IconLink'
import useReveal from '../hooks/useReveal.ts'
import styles from '../styles/Home.module.css'

const EMAIL = 'aleixmp1379@gmail.com'

const ContactSection = () => {
  const sectionRef = useReveal<HTMLElement>()
  const revealDelay = (delay: number): CSSProperties =>
    ({ '--reveal-delay': `${delay}ms` }) as CSSProperties

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`${styles.section} ${styles.contactSection}`}
    >
      <div className={styles.sectionHeader}>
        <span className={styles.eyebrow} data-reveal style={revealDelay(0)}>
          LET&apos;S TALK
        </span>
        <h2 data-reveal style={revealDelay(90)}>
          Contact me
        </h2>
        <p className={styles.sectionLead} data-reveal style={revealDelay(180)}>
          Have a project, product idea, or role where I can help? Let&apos;s
          talk.
        </p>
      </div>

      <div
        className={styles.contactPanel}
        data-reveal
        style={revealDelay(260)}
      >
        <div className={styles.contactMethods} aria-label="Contact methods">
          <IconLink
            link={{
              url: `mailto:${EMAIL}`,
              text: EMAIL,
              icon: 'email'
            }}
            size={22}
            className={styles.contactMethod}
          />
          <IconLink
            link={{
              url: 'https://www.linkedin.com/in/aleixmp/',
              text: 'linkedin.com/in/aleixmp',
              icon: 'linkedin'
            }}
            size={22}
            className={styles.contactMethod}
          />
          <IconLink
            link={{
              url: 'https://github.com/Aleix1379',
              text: 'github.com/Aleix1379',
              icon: 'github'
            }}
            size={22}
            className={styles.contactMethod}
          />
        </div>
      </div>
    </section>
  )
}

export default ContactSection
