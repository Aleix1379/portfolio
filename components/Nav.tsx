import Image from 'next/image'
import styles from '../styles/Nav.module.css'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import MenuButton from './MenuButton'
import useTheme from '../hooks/useTheme'
import SwitchTheme from './SwitchTheme'

const Nav = () => {
	const router = useRouter()
	const [isMenuOpened, setIsMenuOpened] = useState(false)
	const [theme, setTheme] = useTheme()
	const [animationDuration, setAnimationDuration] = useState('0s')
	// const [isHide, setIsHide] = useState(false)

	useEffect(() => {
		document.addEventListener('scroll', onScroll)

		setTimeout(() => {
			setAnimationDuration('0.35s')
		}, 1000)

		return () => {
			document.removeEventListener('scroll', onScroll)
		}
	}, [])

	useEffect(() => {
		setIsMenuOpened(false)
	}, [router.asPath])

	const onScroll = () => {
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

	return (
		<div
			id='navContainer'
			style={{ animationDuration: animationDuration }}
			className={`${styles.navContainer} ${styles.navContainerShow}`}
		>
			<nav className={styles.nav}>
				<Link href={'#'}>
					<a className={styles.logo}>
						<div>
							<Image src={'/images/aleix.jpg'} height={70} width={70} layout={'fixed'} className={styles.avatar} />
						</div>
						<h2 className={styles.name}>Aleix's portfolio</h2>
					</a>
				</Link>

				<SwitchTheme
					className={styles.themeSwitch}
					value={theme === 'dark'}
					size={40}
					onChange={(isDarkTheme => setTheme(isDarkTheme ? 'dark' : 'light'))}
				/>

				<ul className={`${styles.ul} ${isMenuOpened ? styles.menuOpened : null}`}>
					<li className={styles.li}>
						<Link href='#about'>
							<a>About</a>
						</Link>
					</li>
					<li className={styles.li}>
						<Link href='#experience'>
							<a>Experience</a>
						</Link>
					</li>
					<li className={styles.li}>
						<Link href='#projects'>
							<a>Projects</a>
						</Link>
					</li>
					<li className={styles.li}>
						<Link href='#contact'>
							<a>Contact</a>
						</Link>
					</li>
				</ul>

				<MenuButton isActive={isMenuOpened} onClick={() => setIsMenuOpened(!isMenuOpened)} />

			</nav>
		</div>
	)
}

export default Nav
