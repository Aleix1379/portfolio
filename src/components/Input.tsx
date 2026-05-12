import React, { useId } from 'react'
import styles from '../styles/Input.module.css'
import type { Validation } from '../types/Validation'

interface InputProps {
  testID?: string
  label: string
  value: string
  placeholder?: string
  onChange: (value: string) => void
  type?: 'text' | 'textarea' | 'email'
  className?: string | undefined
  validation?: Validation
}

const Input: React.FC<InputProps> = ({
  testID = '',
  label,
  value,
  placeholder,
  onChange,
  type = 'text',
  className,
  validation
}) => {
  const generatedId = useId()
  const inputId = `${label.toLowerCase().replace(/\s+/g, '-')}-${generatedId}`
  const errorId = `${inputId}-error`

  const isValid = () => {
    return !(validation?.touched && validation.message.length > 0)
  }

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <label className={styles.label} htmlFor={inputId}>
        {label}
      </label>
      {type !== 'textarea' && (
        <div>
          <div className={styles.inputWrapper} data-valid={isValid()}>
            <input
              id={inputId}
              data-testid={testID}
              className={styles.input}
              type={type}
              placeholder={placeholder}
              value={value}
              required
              onChange={e => onChange(e.target.value)}
              aria-invalid={!isValid()}
              aria-describedby={!isValid() ? errorId : undefined}
            />
          </div>
          {validation?.touched && validation.message.length > 0 && (
            <div id={errorId} className={styles.error}>
              {validation.message}
            </div>
          )}
        </div>
      )}
      {type === 'textarea' && (
        <div>
          <div className={styles.textareaWrapper} data-valid={isValid()}>
            <textarea
              id={inputId}
              data-testid={testID}
              className={`${styles.input} ${styles.textarea}`}
              placeholder={placeholder}
              value={value}
              required
              rows={7}
              onChange={e => onChange(e.target.value)}
              aria-invalid={!isValid()}
              aria-describedby={!isValid() ? errorId : undefined}
            />
          </div>
          {validation?.touched && validation.message.length > 0 && (
            <div id={errorId} className={styles.error}>
              {validation.message}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Input
