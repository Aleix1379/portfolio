import React, { type CSSProperties } from 'react'
import styles from '../styles/Experience.module.css'
import type { JobExperience } from '../types/JobExperience'
import Chip from './Chip'
import { formatDateWithMonthName, getDifference } from '../utils/time'

interface ExperienceProps {
  experience: JobExperience
  className?: string
  style?: CSSProperties
}

const Experience: React.FC<ExperienceProps> = ({
  experience,
  className,
  style
}) => {
  return (
    <article
      className={`${styles.experience} ${className || ''}`}
      style={style}
      data-reveal
    >
      <div className={styles.header}>
        <div className={styles.roleGroup}>
          <h3>{experience.title}</h3>
          <p className={styles.company}>{experience.company}</p>
        </div>

        <div className={styles.meta}>
          <div className={styles.infoDetails}>
            <span className={styles.location}>{experience.location}</span>
            <span className={styles.jobType}>{experience.type}</span>
          </div>

          <div className={styles.time}>
            <time className={styles.timeCapitalize} dateTime={experience.start}>
              {formatDateWithMonthName(experience.start, {
                month: true,
                year: true,
                short: true
              })}
            </time>
            <span> - </span>
            {experience.end ? (
              <time className={styles.timeCapitalize} dateTime={experience.end}>
                {formatDateWithMonthName(experience.end, {
                  month: true,
                  year: true,
                  short: true
                })}
              </time>
            ) : (
              <span className={styles.timeCapitalize}> present</span>
            )}
            <span className={styles.duration}>
              {' '}
              {getDifference(experience.start, experience.end)}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.technologyList}>
          {experience.technologies.map((technology, index) => (
            <Chip key={index} className={styles.technology}>
              {technology}
            </Chip>
          ))}
        </div>
      </div>
      <ul className={styles.responsibilities}>
        {experience.responsibilities.map((responsibility, index) => (
          <li key={index}>
            <p className={styles.description}>{responsibility}</p>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default Experience
