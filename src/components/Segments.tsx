import React, { type CSSProperties } from 'react'
import badgeStyles from '../styles/Badge.module.css'
import styles from '../styles/Segments.module.css'

export interface SegmentOption {
  id: string
  label: string
}

interface SegmentsProps {
  options: SegmentOption[]
  selectedIndex: number
  onChange: (index: number) => void
  ariaLabel: string
  idPrefix: string
  className?: string
}

const Segments: React.FC<SegmentsProps> = ({
  options,
  selectedIndex,
  onChange,
  ariaLabel,
  idPrefix,
  className
}) => {
  const controlStyle = {
    '--segment-count': options.length,
    '--segment-index': selectedIndex
  } as CSSProperties

  return (
    <div
      className={`${styles.segments} ${className || ''}`}
      style={controlStyle}
      role="tablist"
      aria-label={ariaLabel}
    >
      <span className={styles.indicator} aria-hidden="true" />

      {options.map((option, index) => (
        <button
          key={option.id}
          id={`${idPrefix}-tab-${option.id}`}
          type="button"
          role="tab"
          aria-selected={index === selectedIndex}
          aria-controls={`${idPrefix}-panel-${option.id}`}
          onClick={() => onChange(index)}
          className={styles.segment}
        >
          <span className={badgeStyles.badgeTrack}>
            <span className={styles.segmentLabel}>{option.label}</span>
          </span>
        </button>
      ))}
    </div>
  )
}

export default Segments
