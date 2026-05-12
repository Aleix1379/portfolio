import React from 'react'
import styles from '../styles/Button.module.css'

export interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
  className?: string | undefined
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.button} ${className || ''}`}
    >
      {children}
    </button>
  )
}

export default Button
