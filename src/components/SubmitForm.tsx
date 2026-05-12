import React from 'react'
import styles from '../styles/SubmitForm.module.css'

interface SubmitFormProps {
  label: string
  onClick?: () => void
  className?: string | undefined
  disabled?: boolean
  type?: 'button' | 'submit'
}

const SubmitForm: React.FC<SubmitFormProps> = ({
  label,
  onClick,
  className,
  disabled = false,
  type = 'button'
}) => {
  return (
    <button
      className={`${styles.button} ${!disabled ? styles.buttonActive : styles.buttonDisabled} ${className || ''}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      <span>{label}</span>
      <div className={styles.background}></div>
    </button>
  )
}

export default SubmitForm
