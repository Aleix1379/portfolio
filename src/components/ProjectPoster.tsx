import React from 'react'
import type { FeaturedProjectInfo } from '../types/ProjectInfo'
import styles from '../styles/ProjectPoster.module.css'

export default function ProjectPoster({
  project
}: {
  project: FeaturedProjectInfo
}) {
  const { name, poster } = project
  return (
    <div className={styles.frame} data-motif={poster?.motif}>
      <div className={styles.sheet}>
        <span className={styles.brand}>{name}</span>
        {poster ? (
          <>
            <span className={styles.kicker}>{poster.kicker}</span>
            <strong className={styles.headline}>{poster.headline}</strong>
            {poster.subtitle && (
              <span className={styles.subtitle}>{poster.subtitle}</span>
            )}
            <dl className={styles.facts}>
              {poster.facts.map(([term, value]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <span className={styles.mark} aria-hidden="true" />
          </>
        ) : (
          <strong className={styles.headline}>
            {project.category || name}
          </strong>
        )}
      </div>
    </div>
  )
}
