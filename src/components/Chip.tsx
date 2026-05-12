import React, { type CSSProperties } from 'react'
import styles from '../styles/Chip.module.css'

interface ChipProps {
	children: React.ReactNode
	style?: CSSProperties
	className?: string | undefined
	active?: boolean
}

const Chip: React.FC<ChipProps> = ({ children, className, style, active }) => {
	const activeClass = active ? styles.active : styles.inactive
	const content = React.Children.map(children, child => {
		if (typeof child === 'string' || typeof child === 'number') {
			return <span className={styles.label}>{child}</span>
		}

		return child
	})

	return (
		<span 
			className={`${styles.chip} ${activeClass} ${className || ''}`} 
			style={style}
		>
			{content}
		</span>
	)
}

export default Chip
