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
			<div style={{ backgroundColor: isActive ? '#38c188' : '#9a9a9a' }}></div>
			<div style={{ backgroundColor: isActive ? '#38c188' : '#9a9a9a' }}></div>
			<div style={{ backgroundColor: isActive ? '#38c188' : '#9a9a9a' }}></div>
		</div>
	)
}

export default MenuButton
