import React from 'react'
import styles from '../styles/Experience.module.css'
import type { JobExperience } from '../types/JobExperience'
import { formatDateWithMonthName, getDifference } from '../utils/time'

interface ExperienceProps {
  experience: JobExperience
}

const monthAndYear = (date: string) =>
  formatDateWithMonthName(date, { month: true, year: true, short: true }).trim()

const Experience: React.FC<ExperienceProps> = ({ experience }) => (
  <article
    className={styles.experience}
    aria-labelledby={`job-${experience.id}`}
  >
    <div className={styles.dates}>
      <p className={styles.dateRange}>
        <time dateTime={experience.start}>
          {monthAndYear(experience.start)}
        </time>
        <span aria-hidden="true"> — </span>
        <span className={styles.dateSeparator}> to </span>
        {experience.end ? (
          <time dateTime={experience.end}>{monthAndYear(experience.end)}</time>
        ) : (
          <span>Present</span>
        )}
      </p>
      <p className={styles.duration}>
        {getDifference(experience.start, experience.end)}
      </p>
    </div>
    <div className={styles.content}>
      <p className={styles.company}>{experience.company}</p>
      <h3 id={`job-${experience.id}`} className={styles.title}>
        {experience.title}
      </h3>
      <p className={styles.metadata}>
        <span>{experience.location}</span>
        <span className={styles.jobType}>{experience.type}</span>
      </p>
      <ul className={styles.responsibilities}>
        {experience.responsibilities.map(responsibility => (
          <li key={responsibility}>{responsibility}</li>
        ))}
      </ul>
      <ul className={styles.technologies} aria-label="Technologies used">
        {experience.technologies.map(technology => (
          <li key={technology}>{technology}</li>
        ))}
      </ul>
    </div>
  </article>
)

export default Experience
