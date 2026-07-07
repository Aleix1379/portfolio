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
import Segments from './Segments'
import type { AppInfo } from '../types/ProjectInfo'

interface ProjectProps {
  name: string
  type: string
  description: string
  problem: string
  role: string
  links: Array<Link>
  apps: Array<AppInfo>
  featured?: boolean
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
  featured = false,
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

  const renderLinks = () => {
    if (links.length === 0) {
      return (
        <div className={styles.noLinksAvailable}>
          <span>No public links available</span>
        </div>
      )
    }

    return (
      <div className={styles.links} aria-label={`${name} links`}>
        {links.map((link, index) => (
          <IconLink
            key={index}
            link={link}
            variant="action"
            className={styles.link}
          />
        ))}
      </div>
    )
  }

  const renderPlatformTabs = () => {
    if (!apps || apps.length === 0) {
      return null
    }

    return (
      <div className={styles.platformSection}>
        <Segments
          options={apps.map((app) => ({
            id: app.id,
            label: app.platform
          }))}
          selectedIndex={selectedAppIndex}
          onChange={handleTabClick}
          ariaLabel={`${name} platforms`}
          idPrefix={tabsId}
        />

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
            <div
              className={styles.technologies}
              aria-label={`${activeApp.name} technologies`}
            >
              {activeApp.technologies.map((technology, index) => (
                <IconLink
                  key={index}
                  link={technology}
                  variant="chip"
                  className={styles.techLink}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <article
      className={`${styles.project} ${featured ? styles.projectFeatured : ''} ${className || ''}`}
      style={style}
      data-reveal
    >
      <div className={styles.body}>
        {featured ? (
          <div className={styles.featuredLayout}>
            <div className={styles.featuredMain}>
              <div className={styles.headerRow}>
                <span className={styles.mark} aria-hidden="true">
                  <span className={styles.markLabel}>{getInitials(name)}</span>
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
                  <dt>My role</dt>
                  <dd>{role}</dd>
                </div>
                {activeApp && (
                  <div className={styles.fact}>
                    <dt>Solution</dt>
                    <dd>{activeApp.description}</dd>
                  </div>
                )}
              </dl>

              {renderLinks()}
            </div>

            <div className={styles.featuredAside}>{renderPlatformTabs()}</div>
          </div>
        ) : (
          <>
            <div className={styles.headerRow}>
              <span className={styles.mark} aria-hidden="true">
                <span className={styles.markLabel}>{getInitials(name)}</span>
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
                <dt>My role</dt>
                <dd>{role}</dd>
              </div>
              {activeApp && (
                <div className={styles.fact}>
                  <dt>Solution</dt>
                  <dd>{activeApp.description}</dd>
                </div>
              )}
            </dl>

            {renderLinks()}
            {renderPlatformTabs()}
          </>
        )}
      </div>
    </article>
  )
}

export default Project
