import React, {
  type KeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState
} from 'react'
import { Appstore, Googleplay } from '@icons-pack/react-simple-icons'
import styles from '../styles/Project.module.css'
import type { Link } from '../types/Link'
import type { AppInfo, ProjectPreview } from '../types/ProjectInfo'
import ActionLink from './ActionLink'
import IconLink from './IconLink'

interface ProjectProps {
  name: string
  description: string
  image: string
  links: Array<Link>
  apps: Array<AppInfo>
  preview?: ProjectPreview
  contribution?: string
  featuredTechnologies?: Array<string>
}

const Project: React.FC<ProjectProps> = ({
  name,
  description,
  image,
  links,
  apps,
  preview,
  contribution,
  featuredTechnologies = []
}) => {
  const [hydrated, setHydrated] = useState(false)
  const [activeAppIndex, setActiveAppIndex] = useState(0)
  const selectedIndex = activeAppIndex < apps.length ? activeAppIndex : 0
  const projectId = useId()
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  useEffect(() => {
    setHydrated(true)
  }, [])

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
    <article className={styles.project} aria-labelledby={`${projectId}-title`}>
      {preview ? (
        <img
          className={styles.preview}
          src={preview.src}
          srcSet={preview.srcSet}
          sizes="(min-width: 1248px) 350px, (min-width: 1200px) calc((100vw - 96px) / 3 - 34px), (min-width: 768px) calc((100vw - 72px) / 2 - 34px), calc(100vw - 74px)"
          width={preview.width}
          height={preview.height}
          alt={preview.alt}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <img
          className={styles.logo}
          src={image}
          width={70}
          height={70}
          alt={`${name} logo`}
          loading="lazy"
        />
      )}

      <div className={styles.content}>
        <h3 id={`${projectId}-title`} className={styles.title}>
          {name}
        </h3>
        <p className={styles.description}>{description}</p>
        {contribution && <p className={styles.contribution}>{contribution}</p>}

        {featuredTechnologies.length > 0 && (
          <ul
            className={styles.featuredTechnologies}
            aria-label={`${name} main technologies`}
          >
            {featuredTechnologies.map(technology => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        )}

        {links.length > 0 ? (
          <div className={styles.actions}>
            {links.map((link, index) => (
              <ActionLink
                key={link.url}
                href={link.url}
                variant={index === 0 ? 'primary' : 'secondary'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.text} — ${name} (opens in a new tab)`}
              >
                {link.icon === 'appStore' && (
                  <Appstore
                    aria-hidden="true"
                    focusable="false"
                    size={16}
                    color="currentColor"
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                )}
                {link.icon === 'googlePlay' && (
                  <Googleplay
                    aria-hidden="true"
                    focusable="false"
                    size={16}
                    color="currentColor"
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                )}
                {link.text}
              </ActionLink>
            ))}
          </div>
        ) : (
          <p className={styles.contribution}>No public links available.</p>
        )}

        {apps.length > 0 && (
          <details className={styles.details}>
            <summary>Technical details</summary>
            <div
              className={styles.tabsContainer}
              role="tablist"
              aria-label={`${name} platforms`}
              hidden={!hydrated}
            >
              {apps.map((app, index) => (
                <button
                  type="button"
                  key={app.id}
                  ref={element => {
                    tabRefs.current[index] = element
                  }}
                  id={`${projectId}-tab-${app.id}`}
                  role="tab"
                  aria-selected={index === selectedIndex}
                  aria-controls={`${projectId}-panel-${app.id}`}
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
              <section
                key={app.id}
                className={styles.appContent}
                id={`${projectId}-panel-${app.id}`}
                role={hydrated ? 'tabpanel' : undefined}
                aria-labelledby={
                  hydrated
                    ? `${projectId}-tab-${app.id}`
                    : `${projectId}-heading-${app.id}`
                }
                hidden={hydrated && index !== selectedIndex}
                tabIndex={hydrated ? 0 : undefined}
              >
                <h4 id={`${projectId}-heading-${app.id}`}>{app.name}</h4>
                <p>{app.description}</p>
                <div className={styles.technologyLinks}>
                  {app.technologies.map(technology => (
                    <IconLink
                      key={`${technology.text}-${technology.url}`}
                      link={technology}
                      size={18}
                      color="currentColor"
                      className={styles.technologyLink}
                    />
                  ))}
                </div>
              </section>
            ))}
          </details>
        )}
      </div>
    </article>
  )
}

export default Project
