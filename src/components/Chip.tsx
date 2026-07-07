import React, { type CSSProperties } from 'react'
import badgeStyles from '../styles/Badge.module.css'
import styles from '../styles/Chip.module.css'

interface ChipProps {
  children: React.ReactNode
  style?: CSSProperties
  className?: string | undefined
  active?: boolean
  variant?: 'tech' | 'neutral' | 'stat' | 'note' | 'kicker'
  capitalize?: boolean
  icon?: React.ReactNode
  href?: string
  ariaLabel?: string
}

const Chip: React.FC<ChipProps> = ({
  children,
  className,
  style,
  active,
  variant = 'tech',
  capitalize = false,
  icon,
  href,
  ariaLabel
}) => {
  const isNote = variant === 'note'
  const isKicker = variant === 'kicker'
  const baseClass = isNote ? styles.note : isKicker ? styles.kicker : styles.chip
  const variantClass =
    variant === 'neutral'
      ? styles.neutral
      : variant === 'stat'
        ? styles.stat
        : ''
  const activeClass =
    isNote || isKicker ? '' : active ? styles.active : styles.inactive
  const classNames = `${baseClass} ${variantClass} ${capitalize ? styles.capitalize : ''} ${activeClass} ${href ? styles.chipLink : ''} ${className || ''}`

  const content =
    isKicker ? (
      <span className={styles.kickerLabel}>{children}</span>
    ) : icon ? (
      <span className={badgeStyles.badgeTrack}>
        <span className={styles.chipIcon} aria-hidden="true">
          {icon}
        </span>
        <span className={badgeStyles.badgeLabel}>{children}</span>
      </span>
    ) : (
      <span className={badgeStyles.badgeLabel}>{children}</span>
    )

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={ariaLabel}
        className={classNames}
        style={style}
      >
        {content}
      </a>
    )
  }

  return (
    <span className={classNames} style={style}>
      {content}
    </span>
  )
}

export default Chip
