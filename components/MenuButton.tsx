import React from 'react'
import styles from '../styles/MenuButton.module.css'

interface MenuButtonProps {
	onClick: () => void
	isActive: boolean
}

const MenuButton: React.FC<MenuButtonProps> = ({ onClick, isActive }) => {
	return (
		<div
			className={styles.menu}
			onClick={onClick}
		>
			<div style={{ backgroundColor: isActive ? '#38c188' : '#111' }}></div>
			<div style={{ backgroundColor: isActive ? '#38c188' : '#111' }}></div>
			<div style={{ backgroundColor: isActive ? '#38c188' : '#111' }}></div>
		</div>
	)
}

export default MenuButton
