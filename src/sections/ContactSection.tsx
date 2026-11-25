import React, { useEffect, useState } from 'react'
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
      className={`portfolio-section ${styles.section}`}
    >
      <div className="content-container">
        <div className={styles.layout}>
          <div>
            <p className="section-label">Contact</p>
            <h2 id="contact-heading" data-reveal>
              Let’s build
              <br />
              something useful.
            </h2>
          </div>
          <div className={styles.details} data-reveal>
            <p className={styles.introduction}>
              Have a product in mind or a team looking for a full-stack
              developer? I'd be glad to hear from you.
            </p>
            <a href={`mailto:${email}`} className={styles.email}>
              {email}
            </a>
            <div>
              {hydrated && (
                <button
                  type="button"
                  onClick={copyEmail}
                  disabled={copying}
                  aria-busy={copying}
                  className={styles.copy}
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
              <a
                href="https://www.linkedin.com/in/aleixmp/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
              <a
                href="https://github.com/Aleix1379"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
