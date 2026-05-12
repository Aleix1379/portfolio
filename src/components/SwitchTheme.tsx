import React, { type CSSProperties } from 'react'
import styles from '../styles/SwitchTheme.module.css'

interface SwitchProps {
  value: boolean
  onChange: (value: boolean) => void
  size?: number
  className?: string | undefined
}

const SwitchTheme: React.FC<SwitchProps> = ({
  value,
  onChange,
  size = 22,
  className
}) => {
  const controlHeight = Math.max(38, size + 18)
  const controlWidth = Math.max(70, size * 2 + 32)
  const selectorSize = controlHeight - 8
  const selectorOffset = controlWidth - selectorSize - 8
  const controlStyle = {
    '--switch-width': `${controlWidth}px`,
    '--switch-height': `${controlHeight}px`,
    '--selector-size': `${selectorSize}px`,
    '--selector-offset': `${selectorOffset}px`
  } as CSSProperties

  return (
    <button
      type="button"
      className={`${styles.switch} ${className || ''}`}
      style={controlStyle}
      aria-label={value ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={value}
      onClick={() => onChange(!value)}
    >
      <span
        className={`${styles.iconWrap} ${value ? styles.iconActive : ''}`}
        aria-hidden="true"
      >
        <svg
          className={styles.icon}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M20.2 15.7A8.2 8.2 0 0 1 8.3 3.8a8.8 8.8 0 1 0 11.9 11.9Z"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <span
        className={`${styles.selector} ${value ? styles.selectorDark : styles.selectorLight}`}
        aria-hidden="true"
      />

      <span
        className={`${styles.iconWrap} ${!value ? styles.iconActive : ''}`}
        aria-hidden="true"
      >
        <svg
          className={styles.icon}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle cx="12" cy="12" r="4.4" stroke="currentColor" strokeWidth="1.9" />
          <path
            d="M12 2.8v2.1M12 19.1v2.1M4.9 4.9l1.5 1.5M17.6 17.6l1.5 1.5M2.8 12h2.1M19.1 12h2.1M4.9 19.1l1.5-1.5M17.6 6.4l1.5-1.5"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </button>
  )
}

export default SwitchTheme
