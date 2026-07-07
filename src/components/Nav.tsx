import styles from '../styles/Nav.module.css'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import Button from './Button'
import IconLink from './IconLink'
import MenuButton from './MenuButton'
import { downloadCv } from '../utils/downloadCv'

const EMAIL = 'aleixmp1379@gmail.com'

const contactLinks = [
  { url: `mailto:${EMAIL}`, text: 'Email', icon: 'email' as const },
  {
    url: 'https://www.linkedin.com/in/aleixmp/',
    text: 'LinkedIn',
    icon: 'linkedin' as const
  },
  {
    url: 'https://github.com/Aleix1379',
    text: 'GitHub',
    icon: 'github' as const
  }
]

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' }
]

const MOBILE_NAV_QUERY = '(max-width: 859px)'
const LETTER_STAGGER_MS = 100
const LETTER_ANIMATION_MS = 420

const getLetterStyle = (index: number) =>
  ({
    '--letter-index': index
  }) as CSSProperties

const renderDesktopLabel = (
  label: string,
  isActive: boolean,
  shouldAnimate: boolean
) => {
  const isAnimating = shouldAnimate
  const isSettledActive = isActive && !isAnimating

  return (
    <span className={styles.linkLabel} aria-hidden="true">
      {Array.from(label).map((letter, index) => (
        <span
          key={`${label}-${index}`}
          className={`${styles.linkLetter} ${isSettledActive ? styles.linkLetterActive : ''} ${isAnimating ? styles.linkLetterAnimating : ''}`}
          style={getLetterStyle(index)}
        >
          {letter}
        </span>
      ))}
    </span>
  )
}

const Nav = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const [activeSection, setActiveSection] = useState('about')
  const [animatingSection, setAnimatingSection] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)
  const drawerCloseRef = useRef<HTMLButtonElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const prevActiveSectionRef = useRef(activeSection)

  const closeMenu = useCallback((id?: string) => {
    setIsMenuOpened(false)

    if (id) {
      setActiveSection(id)
    }

    requestAnimationFrame(() => {
      menuButtonRef.current?.focus()
    })
  }, [])

  useEffect(() => {
    if (activeSection === prevActiveSectionRef.current) {
      return
    }

    prevActiveSectionRef.current = activeSection

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setAnimatingSection(null)
      return
    }

    setAnimatingSection(activeSection)

    const activeLabel =
      navItems.find(item => item.id === activeSection)?.label.length ?? 0
    const animationDuration =
      activeLabel * LETTER_STAGGER_MS + LETTER_ANIMATION_MS

    const timer = window.setTimeout(() => {
      setAnimatingSection(null)
    }, animationDuration)

    return () => {
      window.clearTimeout(timer)
    }
  }, [activeSection])

  useEffect(() => {
    const handleScroll = () => {
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
    const sections = navItems
      .map(item => document.getElementById(item.id))
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

  useEffect(() => {
    if (!isMenuOpened) {
      document.body.style.overflow = ''
      return
    }

    const isMobileNav = window.matchMedia(MOBILE_NAV_QUERY).matches

    if (!isMobileNav) {
      return
    }

    document.body.style.overflow = 'hidden'

    const pageSections = [
      document.getElementById('navContainer'),
      document.getElementById('header'),
      document.querySelector('main'),
      document.querySelector('footer')
    ].filter((section): section is HTMLElement => section !== null)

    pageSections.forEach(section => section.setAttribute('inert', ''))

    return () => {
      document.body.style.overflow = ''
      pageSections.forEach(section => section.removeAttribute('inert'))
    }
  }, [isMenuOpened])

  useEffect(() => {
    if (!isMenuOpened) {
      return
    }

    const isMobileNav = window.matchMedia(MOBILE_NAV_QUERY).matches

    if (!isMobileNav) {
      return
    }

    drawerCloseRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeMenu()
        return
      }

      if (event.key !== 'Tab' || !drawerRef.current) {
        return
      }

      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      )

      if (focusable.length === 0) {
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [closeMenu, isMenuOpened])

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_NAV_QUERY)

    const handleChange = () => {
      if (!mediaQuery.matches) {
        setIsMenuOpened(false)
      }
    }

    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  useEffect(() => {
    const drawer = drawerRef.current

    if (!drawer) {
      return
    }

    if (isMenuOpened) {
      drawer.removeAttribute('inert')
    } else {
      drawer.setAttribute('inert', '')
    }
  }, [isMenuOpened])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    closeMenu()
    setActiveSection('about')
  }

  const renderLinks = (variant: 'desktop' | 'drawer') =>
    navItems.map((item, index) => {
      const isActive = activeSection === item.id
      const shouldAnimate =
        variant === 'desktop' && isActive && animatingSection === item.id

      return (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`${styles.link} ${variant === 'drawer' ? styles.drawerLink : ''} ${isActive ? styles.linkActive : ''}`}
          style={
            variant === 'drawer'
              ? ({ '--stagger-delay': `${index * 30}ms` } as React.CSSProperties)
              : undefined
          }
          aria-label={variant === 'desktop' ? item.label : undefined}
          aria-current={isActive ? 'location' : undefined}
          onClick={() => closeMenu(item.id)}
        >
          {variant === 'desktop'
            ? renderDesktopLabel(item.label, isActive, shouldAnimate)
            : item.label}
        </a>
      )
    })

  return (
    <>
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
              <small>Full-stack web developer</small>
            </span>
          </button>

          <div className={styles.desktopLinks}>{renderLinks('desktop')}</div>

          <div className={styles.actions}>
            <MenuButton
              ref={menuButtonRef}
              isActive={isMenuOpened}
              onClick={() => setIsMenuOpened(open => !open)}
            />
          </div>
        </nav>
      </div>

      <div
        ref={drawerRef}
        id="main-navigation-links"
        className={`${styles.drawer} ${isMenuOpened ? styles.drawerOpen : ''}`}
        role="dialog"
        aria-modal={isMenuOpened}
        aria-label="Navigation menu"
        aria-hidden={!isMenuOpened}
      >
        <header className={styles.drawerHeader}>
          <button
            type="button"
            className={styles.drawerLogo}
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <span className={styles.avatarWrap}>
              <img
                src={'/images/aleix.webp'}
                height={44}
                width={44}
                className={styles.avatar}
                alt=""
              />
            </span>
            <span className={styles.drawerName}>
              <strong>Aleix</strong>
              <small className={styles.drawerSubtitle}>
                Full-stack web developer · Vue/Nuxt · Node.js
              </small>
            </span>
          </button>

          <MenuButton
            ref={drawerCloseRef}
            isActive
            onClick={() => closeMenu()}
          />
        </header>

        <nav className={styles.drawerLinks} aria-label="Mobile navigation">
          {renderLinks('drawer')}
        </nav>

        <footer className={styles.drawerFooter}>
          <p className={styles.drawerAvailability}>
            Open to product-focused frontend/full-stack roles.
          </p>

          <Button
            onClick={() => {
              void downloadCv()
              closeMenu()
            }}
            className={styles.drawerCta}
          >
            Download CV
          </Button>

          <div className={styles.drawerSocial} aria-label="Contact links">
            {contactLinks.map(link => (
              <IconLink
                key={link.text}
                link={link}
                variant="action"
                className={styles.drawerSocialLink}
                onClick={() => closeMenu()}
              />
            ))}
          </div>
        </footer>
      </div>
    </>
  )
}

export default Nav
