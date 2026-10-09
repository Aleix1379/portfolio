import React, { useEffect, useState } from 'react'
import ActionLink from '../components/ActionLink'
import actions from '../styles/Action.module.css'
import styles from '../styles/ContactSection.module.css'

const email = 'aleixmp1379@gmail.com'

const ContactSection = () => {
  const [hydrated, setHydrated] = useState(false)
  const [copying, setCopying] = useState(false)
  const [status, setStatus] = useState('')

  useEffect(() => {
    setHydrated(true)
  }, [])

  const copyEmail = async () => {
    setCopying(true)
    setStatus('Copying email…')
    try {
      if (!navigator.clipboard?.writeText)
        throw new Error('Clipboard unavailable')
      await navigator.clipboard.writeText(email)
      setStatus('Email copied')
    } catch {
      setStatus("Couldn't copy. Select and copy the email address.")
    } finally {
      setCopying(false)
    }
  }

  return (
    <section
      id="contact"
      tabIndex={-1}
      aria-labelledby="contact-heading"
      className={`portfolio-section content-container ${styles.section}`}
    >
      <div className={styles.content}>
        <p className={styles.eyebrow}>GET IN TOUCH</p>
        <h2 id="contact-heading">Let's build something useful.</h2>
        <p className={styles.introduction}>
          Have a product in mind or a team looking for a full-stack developer?
          I'd be glad to hear from you.
        </p>
        <a href={`mailto:${email}`} className={styles.email}>
          {email}
        </a>
        <div className={styles.actions}>
          <ActionLink href={`mailto:${email}`} variant="primary">
            Email me
          </ActionLink>
          {hydrated && (
            <button
              type="button"
              onClick={copyEmail}
              disabled={copying}
              aria-busy={copying}
              className={`${actions.action} ${actions.secondary}`}
            >
              {copying ? 'Copying…' : 'Copy email'}
            </button>
          )}
        </div>
        <p
          className={styles.status}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {status}
        </p>
        <div className={styles.socialLinks}>
          <ActionLink
            href="https://www.linkedin.com/in/aleixmp/"
            variant="text"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.socialLink} ${styles.linkedin}`}
          >
            <img
              className={styles.socialIcon}
              src="/images/social/linkedin-low-poly-v1-128.webp"
              srcSet="/images/social/linkedin-low-poly-v1-256.webp 2x"
              width={80}
              height={80}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
            />
            LinkedIn
          </ActionLink>
          <ActionLink
            href="https://github.com/Aleix1379"
            variant="text"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.socialLink} ${styles.github}`}
          >
            <img
              className={styles.socialIcon}
              src="/images/social/github-low-poly-v1-128.webp"
              srcSet="/images/social/github-low-poly-v1-256.webp 2x"
              width={80}
              height={80}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
            />
            GitHub
          </ActionLink>
        </div>
      </div>
      <div className={styles.illustration}>
        <img
          src="/images/contact-aleix.webp"
          alt="Illustration of Aleix waving and holding an open envelope"
          width={1122}
          height={1402}
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  )
}

export default ContactSection
