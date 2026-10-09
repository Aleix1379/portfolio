import React, { useEffect, useRef, useState, type MouseEvent } from 'react'
import styles from '../styles/Nav.module.css'
import useTheme from '../hooks/useTheme'
import SwitchTheme from './SwitchTheme'
const destinations = [
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' }
]
const Nav = () => {
  const [theme, setTheme] = useTheme()
  const [enhanced, setEnhanced] = useState(false)
  const menu = useRef<HTMLDetailsElement>(null)
  const trigger = useRef<HTMLElement>(null)
  const home = useRef<HTMLAnchorElement>(null)
  useEffect(() => {
    setEnhanced(true)
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menu.current?.open) {
        event.preventDefault()
        menu.current.open = false
        trigger.current?.focus()
      }
    }
    const desktop = window.matchMedia('(min-width: 1024px)')
    const closeOnDesktop = () => {
      if (desktop.matches && menu.current?.open) {
        if (menu.current.contains(document.activeElement))
          home.current?.focus({ preventScroll: true })
        menu.current.open = false
      }
    }
    document.addEventListener('keydown', closeOnEscape)
    desktop.addEventListener('change', closeOnDesktop)
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      desktop.removeEventListener('change', closeOnDesktop)
    }
  }, [])
  const navigateFromMenu = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return
    if (menu.current) menu.current.open = false
    const href = event.currentTarget.getAttribute('href')
    if (href?.startsWith('#')) {
      window.requestAnimationFrame(() =>
        document.getElementById(href.slice(1))?.focus({ preventScroll: true })
      )
    } else {
      trigger.current?.focus({ preventScroll: true })
    }
  }
  return (
    <div id="navContainer" className={styles.navContainer}>
      <nav
        className={`${styles.nav} content-container`}
        aria-label="Main navigation"
      >
        <a
          ref={home}
          href="#header"
          className={styles.logo}
          aria-label="Aleix — home"
        >
          <img
            src="/images/aleix.webp"
            alt=""
            width={40}
            height={40}
            className={styles.avatar}
          />
          <span>Aleix</span>
        </a>
        <ul className={styles.desktopLinks}>
          {destinations.map(({ href, label }) => (
            <li key={href}>
              <a href={href}>{label}</a>
            </li>
          ))}
          <li>
            <a href="/cv.pdf" download className={styles.cv}>
              <img
                src="/images/icons/download-cv-low-poly-v1-80.webp"
                srcSet="/images/icons/download-cv-low-poly-v1-160.webp 2x"
                alt=""
                aria-hidden="true"
                width={32}
                height={32}
                className={styles.cvIcon}
                decoding="async"
              />
              <span className={styles.cvLabel}>Download CV</span>
            </a>
          </li>
        </ul>
        <span hidden={!enhanced} className={styles.themeControl}>
          <SwitchTheme
            value={theme === 'dark'}
            onChange={dark => setTheme(dark ? 'dark' : 'light')}
          />
        </span>
        <details ref={menu} className={styles.mobileMenu}>
          <summary ref={trigger} className={styles.menuTrigger}>
            Menu
          </summary>
          <ul className={styles.mobileLinks}>
            {destinations.map(({ href, label }) => (
              <li key={href}>
                <a href={href} onClick={navigateFromMenu}>
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/cv.pdf"
                download
                onClick={navigateFromMenu}
                className={styles.cv}
              >
                <img
                  src="/images/icons/download-cv-low-poly-v1-80.webp"
                  srcSet="/images/icons/download-cv-low-poly-v1-160.webp 2x"
                  alt=""
                  aria-hidden="true"
                  width={32}
                  height={32}
                  className={styles.cvIcon}
                  decoding="async"
                />
                <span className={styles.cvLabel}>Download CV</span>
              </a>
            </li>
          </ul>
        </details>
      </nav>
    </div>
  )
}
export default Nav
