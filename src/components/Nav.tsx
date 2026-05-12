import styles from '../styles/Nav.module.css'
import React, { useEffect, useState } from 'react'
import MenuButton from './MenuButton'

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' }
]

const Nav = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const [activeSection, setActiveSection] = useState('about')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsMenuOpened(false)
      setIsScrolled(window.scrollY > 24)

      if (window.scrollY < 120) {
        setActiveSection('about')
      }
    }

    handleScroll()
    document.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const sections = [...navItems.map(item => item.id), 'contact']
      .map(id => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)

    if (sections.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        const visibleEntries = entries
          .filter(entry => entry.isIntersecting)
          .sort(
            (first, second) =>
              second.intersectionRatio - first.intersectionRatio
          )

        if (visibleEntries.length === 0) {
          return
        }

        setActiveSection(visibleEntries[0].target.id)
      },
      {
        rootMargin: '-28% 0px -42% 0px',
        threshold: [0.18, 0.32, 0.5, 0.7]
      }
    )

    sections.forEach(section => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setIsMenuOpened(false)
    setActiveSection('about')
  }

  const closeMenu = (id?: string) => {
    setIsMenuOpened(false)

    if (id) {
      setActiveSection(id)
    }
  }

  return (
    <div id="navContainer" className={styles.navContainer}>
      <nav
        className={`${styles.nav} ${isScrolled ? styles.navScrolled : ''}`}
        aria-label="Main navigation"
      >
        <button
          type="button"
          className={styles.logo}
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <span className={styles.avatarWrap}>
            <img
              src={'/images/aleix.webp'}
              height={44}
              width={44}
              className={styles.avatar}
              alt="Aleix avatar"
            />
          </span>
          <span className={styles.name}>
            <strong>Aleix</strong>
            <small>Web developer</small>
          </span>
        </button>

        <div
          id="main-navigation-links"
          className={`${styles.links} ${isMenuOpened ? styles.menuOpened : ''}`}
        >
          {navItems.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`${styles.link} ${activeSection === item.id ? styles.linkActive : ''}`}
              onClick={() => closeMenu(item.id)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className={`${styles.link} ${styles.contactLink} ${activeSection === 'contact' ? styles.contactLinkActive : ''}`}
            onClick={() => closeMenu('contact')}
          >
            Contact
          </a>
        </div>

        <div className={styles.actions}>
          <MenuButton
            isActive={isMenuOpened}
            onClick={() => setIsMenuOpened(!isMenuOpened)}
          />
        </div>
      </nav>
    </div>
  )
}

export default Nav
