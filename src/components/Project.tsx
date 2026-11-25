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
  children?: React.ReactNode
  embedded?: boolean
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
  children,
  embedded = false,
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

  const actionLinks = links.map((link, index) => (
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
      {index === 0 && (
        <span aria-hidden="true" className={styles.actionArrow}>
          ↗
        </span>
      )}
    </ActionLink>
  ))

  const overview = (
    <>
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
    </>
  )

  return (
    <article
      className={embedded ? styles.embedded : styles.project}
      aria-labelledby={`${projectId}-title`}
    >
      {!embedded &&
        (preview ? (
          <div className={styles.artwork}>
            <img
              className={styles.preview}
              src={preview.src}
              srcSet={preview.srcSet}
              sizes="(min-width: 1280px) 390px, (min-width: 1050px) 31vw, (min-width: 700px) 46vw, calc(100vw - 40px)"
              width={preview.width}
              height={preview.height}
              alt={preview.alt}
              loading="lazy"
              decoding="async"
            />
          </div>
        ) : (
          <img
            className={styles.logo}
            src={image}
            width={70}
            height={70}
            alt={`${name} logo`}
            loading="lazy"
          />
        ))}

      <div className={styles.content}>
        <h3
          id={`${projectId}-title`}
          className={embedded ? 'visually-hidden' : styles.title}
        >
          {name}
        </h3>
        <p className={styles.description}>{description}</p>
        {links.length > 0 ? (
          <div className={styles.actions}>
            {actionLinks[0]}
            {actionLinks.length > 1 && (
              <div className={styles.secondaryLinks}>
                {actionLinks.slice(1)}
              </div>
            )}
          </div>
        ) : (
          <p className={styles.contribution}>No public links available.</p>
        )}

        {children}
        {apps.length === 0 && overview}
        {apps.length > 0 && (
          <details className={styles.details}>
            <summary>Technical details</summary>
            {overview}
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
