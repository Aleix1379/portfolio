import React from 'react'
import styles from '../styles/SwitchTheme.module.css'
interface SwitchProps {
  value: boolean
  onChange: (value: boolean) => void
  className?: string
}
const SwitchTheme = ({ value, onChange, className = '' }: SwitchProps) => (
  <button
    type="button"
    aria-label="Dark theme"
    aria-pressed={value}
    title={value ? 'Use light theme' : 'Use dark theme'}
    className={`${styles.switch} ${className}`}
    onClick={() => onChange(!value)}
  >
    <img
      src={value ? '/images/sun.png' : '/images/moon.webp'}
      alt=""
      aria-hidden="true"
      width={24}
      height={24}
    />
  </button>
)
export default SwitchTheme
