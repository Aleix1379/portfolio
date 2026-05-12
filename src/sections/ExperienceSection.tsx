import React, { type CSSProperties, useState } from 'react'
import Experience from '../components/Experience'
import Button from '../components/Button'
import useReveal from '../hooks/useReveal.ts'
import styles from '../styles/Home.module.css'
import { getExperience } from '../services/experience.ts'
import { getYearsOfExperience } from '../utils/time'
import type { JobExperience } from '../types/JobExperience'

const hiddenExperienceTypes = ['internship', 'practice', 'trainee', 'intern']
const visibleExperienceLimit = 3

const isMainTimelineExperience = (experience: JobExperience) => {
  const normalizedType = experience.type.toLowerCase().trim()

  return !hiddenExperienceTypes.includes(normalizedType)
}

const ExperienceSection = () => {
  const allExperiences = getExperience()
  const professionalExperiences = allExperiences.filter(
    isMainTimelineExperience
  )
  const yearsOfExperience = getYearsOfExperience({
    filter: { fullTime: true }
  })
  const [showAllExperiences, setShowAllExperiences] = useState(false)
  const experiences = showAllExperiences
    ? professionalExperiences
    : professionalExperiences.slice(0, visibleExperienceLimit)
  const hasAdditionalExperiences =
    professionalExperiences.length > visibleExperienceLimit
  const sectionRef = useReveal<HTMLElement>()
  const revealDelay = (delay: number): CSSProperties =>
    ({ '--reveal-delay': `${delay}ms` }) as CSSProperties

  const toggleExperiences = () => {
    setShowAllExperiences(current => !current)
  }
  return (
    <section
      ref={sectionRef}
      id="experience"
      className={`${styles.section} ${styles.experienceSection}`}
    >
      <div className={styles.sectionHeader}>
        <span className={styles.eyebrow} data-reveal style={revealDelay(0)}>
          CAREER
        </span>
        <h2 data-reveal style={revealDelay(90)}>
          Experience
        </h2>
        <p className={styles.sectionLead} data-reveal style={revealDelay(180)}>
          A focused timeline of roles across eCommerce, front-end, full-stack,
          and mobile application work.
        </p>
      </div>

      <div className={styles.experienceLayout}>
        <aside
          className={styles.experienceIntro}
          aria-label="Experience summary"
          data-reveal
          style={revealDelay(260)}
        >
          <img
            src="/images/experience-professional-timeline.webp"
            alt="Abstract professional experience timeline illustration"
            className={styles.imageExperience}
            width={1280}
            height={549}
            loading="lazy"
          />
          <p>
            Experience building eCommerce platforms, front-end interfaces, web
            apps, and mobile apps.
          </p>
          <div className={styles.experienceFacts}>
            <div>
              <strong>
                +{yearsOfExperience} years building web and mobile apps
              </strong>
              <span>
                Focused on user interfaces, eCommerce flows and practical
                product features.
              </span>
            </div>
            <div>
              <strong>Core stack</strong>
              <span>
                Vue.js, Nuxt.js, React/React Native, TypeScript and Node.js.
              </span>
            </div>
          </div>
        </aside>

        <div className={styles.experienceColumn}>
          <div className={styles.infoExperience}>
            {experiences.map((experience, index) => (
              <Experience
                key={experience.id}
                experience={experience}
                style={revealDelay(320 + index * 90)}
              />
            ))}
          </div>

          {hasAdditionalExperiences && (
            <div className={styles.experienceActions}>
              <Button
                onClick={toggleExperiences}
                className={`${styles.sectionButton} ${styles.experienceActionButton}`}
              >
                {showAllExperiences ? 'Show less' : 'Show all'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
