import React, { type KeyboardEvent, useId, useRef, useState } from 'react'
import styles from '../styles/Project.module.css'
import type { Link } from '../types/Link'
import IconLink from './IconLink'
import type { AppInfo } from '../types/ProjectInfo'
import { useCardTilt } from '../hooks/useCardTilt'
import tiltStyles from '../styles/CardTilt.module.css'

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
  const selectedIndex = activeAppIndex < apps.length ? activeAppIndex : 0
  const tabsId = useId()
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const tiltProps = useCardTilt()

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    let nextIndex: number
    switch (event.key) {
      case 'ArrowRight':
        nextIndex = (index + 1) % apps.length
        break
      case 'ArrowLeft':
        nextIndex = (index - 1 + apps.length) % apps.length
        break
      case 'Home':
        nextIndex = 0
        break
      case 'End':
        nextIndex = apps.length - 1
        break
      default:
        return
    }
    event.preventDefault()
    setActiveAppIndex(nextIndex)
    tabRefs.current[nextIndex]?.focus()
  }

  return (
    <div {...tiltProps} className={`${styles.project} ${tiltStyles.card}`}>
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
          <div
            className={styles.tabsContainer}
            role="tablist"
            aria-label={`${name} platforms`}
          >
            {apps.map((app, index) => (
              <button
                type="button"
                key={app.id}
                ref={element => {
                  tabRefs.current[index] = element
                }}
                id={`${tabsId}-tab-${app.id}`}
                role="tab"
                aria-selected={index === selectedIndex}
                aria-controls={`${tabsId}-panel-${app.id}`}
                tabIndex={index === selectedIndex ? 0 : -1}
                onClick={() => setActiveAppIndex(index)}
                onKeyDown={event => handleTabKeyDown(event, index)}
                className={styles.tabItem}
              >
                {app.platform.charAt(0).toUpperCase() + app.platform.slice(1)}
              </button>
            ))}
          </div>

          {apps.map((app, index) => (
            <div
              key={app.id}
              className={styles.appContent}
              id={`${tabsId}-panel-${app.id}`}
              role="tabpanel"
              aria-labelledby={`${tabsId}-tab-${app.id}`}
              hidden={index !== selectedIndex}
              tabIndex={0}
            >
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
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default Project
