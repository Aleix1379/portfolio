import React from 'react'
import styles from '../styles/Button.module.css'

interface ButtonProps {
	label: string
	onClick: () => void
	className?: string | undefined
	disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className, disabled = false }) => {
	return (
		<button className={`${styles.button} ${!disabled ? styles.buttonActive : styles.buttonDisabled} ${className}`}
			onClick={onClick}
			disabled={disabled}
		>
			<span>{label}</span>
			<div className={styles.background}></div>
		</button>
	)
}

export default Button
