import React, { type CSSProperties, useState, useEffect } from 'react'
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
  links: Array<Link>
  apps: Array<AppInfo>
}

const Project: React.FC<ProjectProps> = ({
  name,
  description,
  image,
  links,
  apps
}) => {
  const [activeAppIndex, setActiveAppIndex] = useState<number>(0)
  const [activeApp, setActiveApp] = useState<AppInfo | null>(null)

  useEffect(() => {
    if (apps && apps.length > 0) {
      setActiveApp(apps[activeAppIndex])
    }
  }, [apps, activeAppIndex])

  const getChipStyle = (
    platform: Platform,
    isActive: boolean = false
  ): CSSProperties => {
    const style = {
      marginTop: 10,
      backgroundColor: 'rgb(43,64,157)',
      cursor: 'pointer',
      marginRight: 10,
      opacity: isActive ? 1 : 0.7
    }
    if (platform === 'mobile') {
      style.backgroundColor = 'rgb(23,114,25)'
    } else if (platform === 'web') {
      style.backgroundColor = 'rgb(123,36,123)'
    }
    return style
  }

  const handleTabClick = (index: number) => {
    setActiveAppIndex(index)
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

      <h3 className={`${styles.subtitle}`}>Links</h3>
      {links.length > 0 && (
        <>
          <div className={`${styles.links} ${styles.linksLast}`}>
            {links.map((link, index) => (
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

      {links.length === 0 && (
        <div className={styles.noLinksAvailable}>
          <span>No links available</span>
        </div>
      )}

      {apps && apps.length > 0 && (
        <>
          <div className={styles.tabsContainer}>
            {apps.map((app, index) => (
              <div
                key={index}
                onClick={() => handleTabClick(index)}
                className={styles.tabItem}>
                <Chip
                  style={getChipStyle(app.platform, index === activeAppIndex)}>
                  {`${app.platform} ${app.name.split(' ')[0]}`}
                </Chip>
              </div>
            ))}
          </div>

          {activeApp && (
            <div className={styles.appContent}>
              <p>{activeApp.description}</p>

              <h3 className={styles.subtitle}>Technologies</h3>
              <div className={styles.links}>
                {activeApp.technologies.map((technology, index) => (
                  <IconLink
                    key={index}
                    link={technology}
                    size={25}
                    className={styles.link}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Project
