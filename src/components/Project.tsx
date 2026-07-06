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
  type: string
  description: string
  problem: string
  role: string
  links: Array<Link>
  apps: Array<AppInfo>
  className?: string
  style?: CSSProperties
}

const getInitials = (value: string): string => {
  const words = value.trim().split(/\s+/)

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase()
  }

  return (words[0][0] + words[1][0]).toUpperCase()
}

const Project: React.FC<ProjectProps> = ({
  name,
  type,
  description,
  problem,
  role,
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
      <div className={styles.body}>
        <div className={styles.headerRow}>
          <span className={styles.mark} aria-hidden="true">
            {getInitials(name)}
          </span>
          <div className={styles.titleGroup}>
            <h3>{name}</h3>
            <span className={styles.type}>{type}</span>
          </div>
        </div>

        <p className={styles.description}>{description}</p>

        <dl className={styles.facts}>
          <div className={styles.fact}>
            <dt>Problem</dt>
            <dd>{problem}</dd>
          </div>
          <div className={styles.fact}>
            <dt>Role</dt>
            <dd>{role}</dd>
          </div>
        </dl>

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
