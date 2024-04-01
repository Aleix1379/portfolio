import styles from '../styles/Nav.module.css'
import React, { useEffect, useState } from 'react'
import MenuButton from './MenuButton'
import useTheme from '../hooks/useTheme'
import SwitchTheme from './SwitchTheme'

const Nav = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const [theme, setTheme] = useTheme()
  const [animationDuration, setAnimationDuration] = useState('0s')

  useEffect(() => {
    document.addEventListener('scroll', onScroll)

    setTimeout(() => {
      setAnimationDuration('0.35s')
    }, 1000)

    return () => {
      document.removeEventListener('scroll', onScroll)
    }
  }, [])

  const onScroll = () => {
    setIsMenuOpened(false)
    const limit = window.innerWidth < 500 ? 380 : 330
    const element = document.getElementById('navContainer')

    if (!element) {
      return
    }

    let classToRemove = styles.navContainerHide
    let classToAdd = styles.navContainerShow

    if (document.documentElement.scrollTop >= limit) {
      classToRemove = styles.navContainerShow
      classToAdd = styles.navContainerHide
    }

    if (classToAdd && classToRemove) {
      element.classList.remove(classToRemove)
      element.classList.add(classToAdd)
    }
  }

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
      className={`${styles.navContainer} ${styles.navContainerShow}`}
    >
      <nav className={styles.nav}>
        <div>
          <div className={styles.logo} onClick={scrollToTop}>
            <div>
              <img
                src={'/images/aleix.webp'}
                height={70}
                width={70}
                className={styles.avatar}
                alt="Avatar"
              />
            </div>
            <h2 className={styles.name}>Aleix's portfolio</h2>
          </div>
        </div>

        <SwitchTheme
          className={styles.themeSwitch}
          value={theme === 'dark'}
          size={40}
          onChange={(isDarkTheme => {
              console.info('isDarkTheme', isDarkTheme)
              setTheme(isDarkTheme ? 'dark' : 'light')
            }
          )}
        />

        <ul className={`${styles.ul} ${isMenuOpened ? styles.menuOpened : null}`}>
          <li className={styles.li}>
            <div onClick={() => scrollTo('about')}> {/*'#about'*/}
              About
            </div>
          </li>
          <li className={styles.li}>
            <div onClick={() => scrollTo('experience')}> {/*'#experience'*/}
              Experience
            </div>
          </li>
          <li className={styles.li}>
            <div onClick={() => scrollTo('projects')}> {/*'#projects'*/}
              Projects
            </div>
          </li>
          <li className={styles.li}>
            <div onClick={() => scrollTo('contact')}> {/*'#contact'*/}
              Contact
            </div>
          </li>
        </ul>

        <MenuButton isActive={isMenuOpened} onClick={() => setIsMenuOpened(!isMenuOpened)} />

      </nav>
    </div>
  )
}

export default Nav
