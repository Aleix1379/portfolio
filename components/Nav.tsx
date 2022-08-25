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

	useEffect(() => {
		setIsMenuOpened(false)
	}, [router.asPath])

	return <div className={styles.navContainer}>
		<nav className={styles.nav}>
			<Link href={'#'}>
				<a className={styles.logo}>
					<div>
						<Image src={'/images/aleix.jpeg'} height={60} width={60} layout={'fixed'} className={styles.avatar} />
					</div>
					<h2 className={styles.name}>Aleix's portfolio</h2>
				</a>
			</Link>

			<SwitchTheme
				className={styles.themeSwitch}
				value={theme === 'dark'}
				onChange={(isDarkTheme => setTheme(isDarkTheme ? 'dark' : 'light'))}
			/>

			<ul className={`${styles.ul} ${isMenuOpened ? styles.menuOpened : null}`}>
				<li className={styles.li}>
					<Link href='#about'>
						<a>About</a>
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
}

export default Nav
