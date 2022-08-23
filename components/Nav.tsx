import Image from 'next/image'
import styles from '../styles/Nav.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import MenuButton from './MenuButton'

const Nav = () => {
	const router = useRouter()
	const [isMenuOpened, setIsMenuOpened] = useState(false)

	useEffect(() => {
		setIsMenuOpened(false)
	}, [router.asPath])

	return <div className={styles.navContainer}>
		<nav className={styles.nav}>
			<Link href={'#'}>
				<a className={styles.logo}>
					<div>
						<Image src={'/images/logo.png'} height={45} width={45} layout={'fixed'} className='avatar' />
					</div>
					<h2 className={styles.name}>Aleix's portfolio</h2>
				</a>
			</Link>

			<ul className={`${styles.ul} ${isMenuOpened ? styles.menuOpened : null}`}>
				<li className={styles.li}>
					<Link href='#about'>
						<a>About</a>
					</Link>
				</li>
				{/*				<li className={styles.li}>
					<Link href='#experience'>
						<a>Experience</a>
					</Link>
				</li>*/}
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
