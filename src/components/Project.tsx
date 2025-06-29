import React, { type CSSProperties } from 'react'
import styles from '../styles/Project.module.css'
import type { Link } from '../types/Link'
import IconLink from './IconLink'
import type { Platform } from '../types/Platform'
import Chip from './Chip'
import type { AppInfo } from '../types/ProjectInfo'

interface ProjectProps {
  name: string
  description: string
  image: string
  apps: Array<AppInfo>
}

const Project: React.FC<ProjectProps> = ({
  name,
  description,
  image,
  apps
}) => {
  const getChipStyle = (platform: Platform): CSSProperties => {
    const style = {
      marginTop: 10,
      backgroundColor: 'rgb(43,64,157)'
    }
    if (platform === 'mobile') {
      style.backgroundColor = 'rgb(23,114,25)'
    } else if (platform === 'web') {
      style.backgroundColor = 'rgb(123,36,123)'
    }
    return style
  }

  return (
    <div className={styles.project}>
      <div className={styles.title}>
        <h2 className={styles.subtitle}>{name}</h2>
      </div>

      <div className={styles.image}>
        <img src={image} width={70} height={70} alt="Project logo" />
      </div>

      <p>{description}</p>

      {apps && apps.map((app, appIndex) => (
        <div key={appIndex} className={styles.app}>
          <div className={styles.title}>
            <h3 className={styles.subtitle}>{app.name}</h3>
            <Chip style={getChipStyle(app.platform)}>{app.platform}</Chip>
          </div>

          <p>{app.description}</p>

          <h3 className={styles.subtitle}>Technologies</h3>
          <div className={styles.links}>
            {app.technologies.map((technology, index) => (
              <IconLink
                key={index}
                link={technology}
                size={25}
                className={styles.link}
              />
            ))}
          </div>

          <h3 className={`${styles.subtitle} ${styles.pages}`}>Links</h3>
          {app.links.length > 0 && (
            <>
              <div className={`${styles.links} ${styles.linksLast}`}>
                {app.links.map((link, index) => (
                  <IconLink
                    key={index}
                    link={link}
                    size={25}
                    className={styles.link}
                  />
                ))}
              </div>
            </>
          )}

          {app.links.length === 0 && (
            <div className={styles.noLinksAvailable}>
              <span>No links available</span>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Project
