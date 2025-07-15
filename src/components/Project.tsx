import React, { type CSSProperties, useState, useEffect, useRef } from 'react'
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
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const projectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (apps && apps.length > 0) {
      setActiveApp(apps[activeAppIndex])
    }
  }, [apps, activeAppIndex])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!projectRef.current) return

    const card = projectRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Calculate tilt values based on mouse position relative to card center
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Calculate normalized position (-1 to 1)
    const normalizedX = (x - centerX) / centerX
    const normalizedY = (y - centerY) / centerY

    // Calculate distance from center (0 to 1)
    const distanceFromCenter = Math.min(
      1,
      Math.sqrt(normalizedX * normalizedX + normalizedY * normalizedY)
    )

    // Apply non-linear scaling to enhance corner effect
    const cornerFactor = 1 + distanceFromCenter * 0.5

    // Calculate tilt (max 15 degrees)
    const tiltX = -normalizedY * 15 * cornerFactor
    const tiltY = normalizedX * 15 * cornerFactor

    setTilt({ x: tiltX, y: tiltY })
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setTilt({ x: 0, y: 0 })
  }

  const getChipStyle = (platform: Platform): CSSProperties => {
    const style = {
      marginTop: 10,
      backgroundColor: 'rgb(43,64,157)',
      marginRight: 10
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

  const getCardStyle = (): CSSProperties => {
    return {
      transform: isHovering
        ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.05, 1.05, 1.05)`
        : 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)',
      transition: isHovering
        ? 'transform 0.25s ease-out'
        : 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
      boxShadow: isHovering
        ? '0 10px 15px -8px rgba(0, 0, 0, 0.2)'
        : '5px 5px 20px -5px var(--sh-project)',
      border: 'none'
    }
  }

  return (
    <div
      ref={projectRef}
      className={styles.project}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={getCardStyle()}>
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
                  style={getChipStyle(app.platform)}
                  active={index === activeAppIndex}>
                  {app.platform}
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
