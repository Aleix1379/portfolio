import React, { CSSProperties } from 'react'
import styles from '../styles/Chip.module.css'

interface ChipProps {
	children: string
	style?: CSSProperties
	className?: string | undefined;
}

const Chip: React.FC<ChipProps> = ({ children, className, style }) => {
	return <span className={`${styles.chip} ${className}`} style={style}>{children}</span>
}

export default Chip
