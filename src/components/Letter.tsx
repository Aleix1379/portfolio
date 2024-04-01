import React from "react";
import type { CSSProperties } from 'react'
import styles from '../styles/Letter.module.css'

interface LetterProps {
  value: string
  className?: string | undefined
  style?: CSSProperties | undefined;
}

const Letter: React.FC<LetterProps> = ({ value, className, style }) => {
  return (
    <span
      className={`${styles.letter} ${className}`}
      style={style}
    >
   {value}
  </span>
  )
}

export default Letter
