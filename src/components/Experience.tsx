import React, { type CSSProperties } from 'react'
import styles from '../styles/Experience.module.css'
import type { JobExperience } from '../types/JobExperience'
import Chip from './Chip'
import ExperienceMetaIcon from './ExperienceMetaIcon'
import { formatDateWithMonthName, getDifference } from '../utils/time'
import {
  getJobTypeIcon,
  getJobTypeLabel,
  getLocationIcon,
  getLocationMapsUrl
} from '../utils/experienceMeta'

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
            <Chip
              variant="neutral"
              href={getLocationMapsUrl(experience.location)}
              ariaLabel={`Open ${experience.location} in Google Maps`}
              icon={
                <ExperienceMetaIcon name={getLocationIcon(experience.location)} />
              }
            >
              {experience.location}
            </Chip>
            <Chip
              variant="neutral"
              icon={
                <ExperienceMetaIcon name={getJobTypeIcon(experience.type)} />
              }
            >
              {getJobTypeLabel(experience.type)}
            </Chip>
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

      <p className={styles.summary}>{experience.summary}</p>

      <div className={styles.details}>
        <div className={styles.technologyList}>
          {experience.technologies.map((technology, index) => (
            <Chip key={index} className={styles.technology}>
              {technology}
            </Chip>
          ))}
        </div>
      </div>
    </article>
  )
}

export default Experience
