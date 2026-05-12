import React, {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties
} from 'react'
import styles from '../styles/Project.module.css'
import type { Link } from '../types/Link'
import IconLink from './IconLink'
import type { AppInfo } from '../types/ProjectInfo'

interface ProjectProps {
  name: string
  description: string
  image: string
  links: Array<Link>
  apps: Array<AppInfo>
  className?: string
  style?: CSSProperties
}

const Project: React.FC<ProjectProps> = ({
  name,
  description,
  image,
  links,
  apps,
  className,
  style
}) => {
  const [activeAppIndex, setActiveAppIndex] = useState<number>(0)
  const [selectedAppIndex, setSelectedAppIndex] = useState<number>(0)
  const [isSwitchingApp, setIsSwitchingApp] = useState(false)
  const switchTimeoutRef = useRef<number | undefined>(undefined)
  const activeApp = apps[activeAppIndex]
  const primaryApp = apps[0]
  const tabsId = useId()

  const handleTabClick = (index: number) => {
    if (index === selectedAppIndex) {
      return
    }

    window.clearTimeout(switchTimeoutRef.current)
    setSelectedAppIndex(index)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActiveAppIndex(index)
      setIsSwitchingApp(false)
      return
    }

    setIsSwitchingApp(true)

    switchTimeoutRef.current = window.setTimeout(() => {
      setActiveAppIndex(index)
      setIsSwitchingApp(false)
    }, 120)
  }

  useEffect(() => {
    return () => window.clearTimeout(switchTimeoutRef.current)
  }, [])

  return (
    <article
      className={`${styles.project} ${className || ''}`}
      style={style}
      data-reveal
    >
      <div className={styles.media}>
        <img
          src={image}
          width={92}
          height={92}
          alt={`${name} logo`}
          loading="lazy"
        />
        {primaryApp && (
          <span className={styles.platform}>
            <span className={styles.pillLabel}>{primaryApp.platform}</span>
          </span>
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.content}>
          <div className={styles.title}>
            <h3>{name}</h3>
          </div>

          <p className={styles.description}>{description}</p>
        </div>

        {links.length > 0 && (
          <div className={styles.links} aria-label={`${name} links`}>
            {links.map((link, index) => (
              <IconLink
                key={index}
                link={link}
                size={18}
                className={styles.link}
              />
            ))}
          </div>
        )}

        {links.length === 0 && (
          <div className={styles.noLinksAvailable}>
            <span>No public links available</span>
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
                  key={index}
                  id={`${tabsId}-tab-${app.id}`}
                  type="button"
                  role="tab"
                  aria-selected={index === selectedAppIndex}
                  aria-controls={`${tabsId}-panel-${app.id}`}
                  onClick={() => handleTabClick(index)}
                  className={styles.tabItem}
                >
                  <span className={styles.pillLabel}>{app.platform}</span>
                </button>
              ))}
            </div>

            {activeApp && (
              <div
                id={`${tabsId}-panel-${activeApp.id}`}
                role="tabpanel"
                aria-labelledby={`${tabsId}-tab-${activeApp.id}`}
                key={activeApp.id}
                className={`${styles.appContent} ${
                  isSwitchingApp ? styles.appContentExit : styles.appContentEnter
                }`}
              >
                <p>{activeApp.description}</p>

                <div
                  className={styles.technologies}
                  aria-label={`${activeApp.name} technologies`}
                >
                  {activeApp.technologies.map((technology, index) => (
                    <IconLink
                      key={index}
                      link={technology}
                      size={16}
                      className={styles.techLink}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </article>
  )
}

export default Project
