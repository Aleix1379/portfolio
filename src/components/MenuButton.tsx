import React, { forwardRef } from 'react'
import styles from '../styles/MenuButton.module.css'

interface MenuButtonProps {
  onClick: () => void
  isActive: boolean
}

const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  ({ onClick, isActive }, ref) => {
    return (
      <button
        ref={ref}
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
)

MenuButton.displayName = 'MenuButton'

export default MenuButton
