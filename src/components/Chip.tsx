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
}

const Chip: React.FC<ChipProps> = ({
  children,
  className,
  style,
  active,
  variant = 'tech',
  capitalize = false
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

  return (
    <span
      className={`${baseClass} ${variantClass} ${capitalize ? styles.capitalize : ''} ${activeClass} ${className || ''}`}
      style={style}
    >
      {isKicker ? (
        <span className={styles.kickerLabel}>{children}</span>
      ) : (
        <span className={badgeStyles.badgeLabel}>{children}</span>
      )}
    </span>
  )
}

export default Chip
