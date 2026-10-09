import styles from '../styles/Nav.module.css'
import React, { useEffect, useState } from 'react'
import MenuButton from './MenuButton'
import useTheme from '../hooks/useTheme'
import SwitchTheme from './SwitchTheme'

const Nav = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const [theme, setTheme] = useTheme()
  const [animationDuration, setAnimationDuration] = useState('0s')
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false)

  useEffect(() => {
    const updateNavigation = () => {
      const header = document.getElementById('header')
      if (!header) return

      const headerBottom = header.getBoundingClientRect().bottom + window.scrollY
      setIsHeaderScrolled(window.scrollY >= headerBottom)
    }

    const onScroll = () => {
      setIsMenuOpened(false)
      updateNavigation()
    }

    document.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updateNavigation)
    updateNavigation()

    const animationTimer = window.setTimeout(() => {
      setAnimationDuration('0.35s')
    }, 1000)

    return () => {
      document.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updateNavigation)
      window.clearTimeout(animationTimer)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollTo = (id: string) => {
    window.document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div
      id="navContainer"
      style={{ animationDuration: animationDuration }}
      className={`${styles.navContainer} ${isHeaderScrolled ? styles.navContainerHide : styles.navContainerShow}`}>
      <nav className={styles.nav}>
        <div>
          <button className={styles.logo} onClick={scrollToTop} type="button" aria-label="Scroll to top">
            <div>
              <img
                src={'/images/aleix.webp'}
                height={70}
                width={70}
                className={styles.avatar}
                alt="Avatar"
              />
            </div>
            <h2 className={styles.name}>Aleix</h2>
          </button>
        </div>

        <SwitchTheme
          className={styles.themeSwitch}
          value={theme === 'dark'}
          size={40}
          onChange={isDarkTheme => {
            console.info('isDarkTheme', isDarkTheme)
            setTheme(isDarkTheme ? 'dark' : 'light')
          }}
        />

        <ul
          className={`${styles.ul} ${isMenuOpened ? styles.menuOpened : null}`}>
          <li className={styles.li}>
            <button type="button" onClick={() => scrollTo('about')}>About</button>
          </li>
          <li className={styles.li}>
            <button type="button" onClick={() => scrollTo('experience')}>Experience</button>
          </li>
          <li className={styles.li}>
            <button type="button" onClick={() => scrollTo('projects')}>Projects</button>
          </li>
          <li className={styles.li}>
            <button type="button" onClick={() => scrollTo('contact')}>Contact</button>
          </li>
        </ul>

        <MenuButton
          isActive={isMenuOpened}
          onClick={() => setIsMenuOpened(!isMenuOpened)}
        />
      </nav>
    </div>
  )
}

export default Nav
