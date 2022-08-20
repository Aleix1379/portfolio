import React from 'react'
import styles from '../styles/Button.module.css'

interface ButtonProps {
  label: string
  onClick: () => void
  className?: string | undefined;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className }) => {
	return (
		<button className={`${styles.button} ${className}`} onClick={onClick}>
			<span>{label}</span>
			<div className={styles.background}></div>
		</button>
	)
}

export default Button
