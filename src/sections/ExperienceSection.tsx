import React, { useEffect, useRef, useState } from 'react'
import Experience from '../components/Experience'
import { getExperience } from '../services/experience.ts'
import styles from '../styles/ExperienceSection.module.css'

const ExperienceSection = () => {
  const [expanded, setExpanded] = useState(false)
  const history = useRef<HTMLDetailsElement>(null)
  useEffect(() => {
    // Native details can be opened before this island hydrates.
    setExpanded(Boolean(history.current?.open))
  }, [])
  const featured = getExperience(3)
  const previous = getExperience().slice(featured.length)

  return (
    <section
      id="experience"
      tabIndex={-1}
      aria-labelledby="experience-heading"
      className={`portfolio-section content-container ${styles.section}`}
    >
      <div className={styles.heading}>
        <p className={styles.eyebrow}>THE JOURNEY</p>
        <h2 id="experience-heading">Experience</h2>
        <p className={styles.introduction}>
          Building products with teams, from interfaces to the services behind
          them.
        </p>
      </div>
      <div className={styles.timeline}>
        {featured.map(experience => (
          <Experience key={experience.id} experience={experience} />
        ))}
        {previous.length > 0 && (
          <details
            ref={history}
            className={styles.history}
            onToggle={event => setExpanded(event.currentTarget.open)}
          >
            <summary className={styles.summary}>
              {expanded ? 'Show less experience' : 'View full experience'}
            </summary>
            <div className={styles.previous}>
              {previous.map(experience => (
                <Experience key={experience.id} experience={experience} />
              ))}
            </div>
          </details>
        )}
      </div>
    </section>
  )
}

export default ExperienceSection
