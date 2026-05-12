import React from 'react'
import styles from '../styles/MenuButton.module.css'

interface MenuButtonProps {
  onClick: () => void
  isActive: boolean
}

const MenuButton: React.FC<MenuButtonProps> = ({ onClick, isActive }) => {
  return (
    <button
      type="button"
      className={`${styles.menu} ${isActive ? styles.menuActive : ''}`}
      aria-label={isActive ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={isActive}
      aria-controls="main-navigation-links"
      onClick={onClick}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  )
}

export default MenuButton
