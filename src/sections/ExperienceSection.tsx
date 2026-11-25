import React, { useEffect, useRef, useState } from 'react'
import Experience from '../components/Experience'
import { getExperience } from '../services/experience.ts'
import styles from '../styles/ExperienceSection.module.css'

const ExperienceSection = () => {
  const [expanded, setExpanded] = useState(false)
  const timeline = useRef<HTMLDivElement>(null)
  const history = useRef<HTMLDetailsElement>(null)
  useEffect(() => {
    // Native details can be opened before this island hydrates.
    setExpanded(Boolean(history.current?.open))
  }, [])
  useEffect(() => {
    const list = timeline.current
    if (!list) return
    const dates = Array.from(list.querySelectorAll<HTMLElement>('[data-job-date]'))
    let frame = 0

    const update = () => {
      frame = 0
      const visible = dates.filter(date => !date.closest('details:not([open])'))
      const readingLine = Math.max(100, window.innerHeight * 0.35)
      let current = visible[0]
      for (const date of visible) {
        if (date.getBoundingClientRect().top > readingLine) break
        current = date
      }
      if (!current) return
      // The article and timeline are the two positioned ancestors of the date.
      const job = current.closest('article')!
      const y = job.offsetTop + job.clientTop + current.offsetTop + current.offsetHeight / 2
      list.style.setProperty('--marker-y', y + 'px')
      list.setAttribute('data-marker-ready', '')
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(schedule)
    observer?.observe(list)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      observer?.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(frame)
    }
  }, [expanded])
  const experience = getExperience()
  const featured = experience.filter(job => job.type === 'full-time').slice(0, 3)
  const featuredIds = new Set(featured.map(job => job.id))
  const previous = experience.filter(job => !featuredIds.has(job.id))

  return (
    <section
      id="experience"
      tabIndex={-1}
      aria-labelledby="experience-heading"
      className={`portfolio-section content-container ${styles.section}`}
    >
      <div className={styles.heading}>
        <h2 id="experience-heading" className="section-display" data-reveal>Experience</h2>
        <p className={styles.introduction}>
          Building products with teams, from interfaces to the services behind
          them.
        </p>
      </div>
      <div ref={timeline} className={styles.timeline}>
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
        <span aria-hidden="true" className={styles.marker} />
      </div>
    </section>
  )
}

export default ExperienceSection
