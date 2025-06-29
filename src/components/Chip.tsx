import React, { type CSSProperties } from 'react'
import styles from '../styles/Chip.module.css'

interface ChipProps {
	children: string
	style?: CSSProperties
	className?: string | undefined
	active?: boolean
}

const Chip: React.FC<ChipProps> = ({ children, className, style, active }) => {
	const activeClass = active ? styles.active : styles.inactive
	return (
		<span 
			className={`${styles.chip} ${activeClass} ${className || ''}`} 
			style={style}
		>
			{children}
		</span>
	)
}

export default Chip
