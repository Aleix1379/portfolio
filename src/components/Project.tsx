import React, { type CSSProperties } from 'react'
import styles from '../styles/Project.module.css'
import type { Link } from '../types/Link'
import IconLink from './IconLink'
import type { Platform } from '../types/Platform'
import Chip from './Chip'

interface ProjectProps {
  name: string
  description: string
  platform: Platform
  image: string
  links: Array<Link>
  technologies: Array<Link>
}

const Project: React.FC<ProjectProps> = ({
  name,
  description,
  platform,
  image,
  links,
  technologies
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
        <Chip style={getChipStyle(platform)}>{platform}</Chip>
      </div>

      <div className={styles.image}>
        <img src={image} width={70} height={70} alt="Project logo" />
      </div>

      <p>{description}</p>

      <h2 className={styles.subtitle}>Technologies</h2>
      <div className={styles.links}>
        {technologies.map((technology, index) => (
          <IconLink
            key={index}
            link={technology}
            size={25}
            className={styles.link}
          />
        ))}
      </div>

      <h2 className={`${styles.subtitle} ${styles.pages}`}>Links</h2>
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
    </div>
  )
}

export default Project
