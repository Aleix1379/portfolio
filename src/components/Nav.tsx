import React, { useEffect, useRef, useState, type MouseEvent } from 'react'
import styles from '../styles/Nav.module.css'
const destinations = [
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' }
]
const Nav = () => {
  const [compact, setCompact] = useState(false)
  const [current, setCurrent] = useState('#projects')
  useEffect(() => {
    const sections = destinations.map(({ href }) =>
      document.getElementById(href.slice(1))
    )
    let frame = 0
    const update = () => {
      frame = 0
      const { scrollY, innerHeight } = window
      setCompact(scrollY > 12)
      const atEnd =
        scrollY > 0 &&
        scrollY + innerHeight >= document.documentElement.scrollHeight - 2
      const readingLine = Math.max(100, innerHeight * 0.24)
      const section = sections
        .filter(
          element =>
            element && element.getBoundingClientRect().top <= readingLine
        )
        .pop()
      setCurrent(atEnd ? '#contact' : section ? `#${section.id}` : '#projects')
    }
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    document.addEventListener('toggle', schedule, true)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      document.removeEventListener('toggle', schedule, true)
      window.cancelAnimationFrame(frame)
    }
  }, [])
  const menu = useRef<HTMLDetailsElement>(null)
  const trigger = useRef<HTMLElement>(null)
  const home = useRef<HTMLAnchorElement>(null)
  useEffect(() => {
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
    <div className={styles.navContainer} data-compact={compact}>
      <nav className={styles.nav} aria-label="Main navigation">
        <a
          ref={home}
          href="#header"
          className={styles.logo}
          aria-label="Aleix — home"
        >
          <span aria-hidden="true" className={styles.monogram}>
            am.
          </span>
          <span className={styles.identity}>
            <strong>Aleix Martínez Pena</strong>Full-stack developer
          </span>
        </a>
        <ul className={styles.desktopLinks}>
          {destinations.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                aria-current={current === href ? 'location' : undefined}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <details ref={menu} className={styles.mobileMenu}>
          <summary ref={trigger} className={styles.menuTrigger}>
            Menu
          </summary>
          <ul className={styles.mobileLinks}>
            {destinations.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  aria-current={current === href ? 'location' : undefined}
                  onClick={navigateFromMenu}
                >
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
