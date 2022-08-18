import Image from "next/image";
import styles from "../styles/Nav.module.css";
import {useRouter} from 'next/router';
import Link from "next/link";
import {useEffect, useState} from "react";

interface NavState {
    Section: {
        id: string
        top: number
    }
}

const Nav = () => {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState('');
    const [isMenuOpened, setIsMenuOpened] = useState(false)


    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    })

    useEffect(() => {
        setCurrentPage(router.asPath)
        setIsMenuOpened(false)
    }, [router.asPath])

    const getSelectedLinkClass = (page: string) => {
        if (page === currentPage) {
            return styles.selected
        }
    }

    const updateCurrentPage = (nearest: NavState['Section'] | null) => {
        const header = window.document.getElementById('header')
        let headerHeight = 0
        if (header) {
            headerHeight = header.getBoundingClientRect().height
        }
        if (nearest && document.documentElement.scrollTop > headerHeight) {
            setCurrentPage(nearest.id)
        } else {
            setCurrentPage('')
        }
    }

    const handleScroll = (e: Event) => {
        setTimeout(() => {
            const aboutElement = window.document.getElementById('about')
            const experienceElement = window.document.getElementById('experience')
            const projectsElement = window.document.getElementById('projects')
            const contactElement = window.document.getElementById('contact')

            const elementsWithTop: Array<NavState['Section']> = [
                {id: 'about', top: getTop(aboutElement)},
                {id: 'experience', top: getTop(experienceElement)},
                {id: 'projects', top: getTop(projectsElement)},
                {id: 'contact', top: getTop(contactElement)}
            ]
            const nearest = closestToZero(elementsWithTop)
            updateCurrentPage(nearest)
        },500)
    }

    const getTop = (el: HTMLElement | null): number => {
        if (!el) {
            return -10000
        }
        return el.getBoundingClientRect().top
    }

    const closestToZero = (tops: Array<NavState['Section']>): NavState['Section'] | null => {
        if (!tops.length) {
            return null;
        }

        let closest: NavState['Section'] = {
            id: '',
            top: 0
        };

        for (let i = 0; i < tops.length; i++) {
            if (closest.top === 0) {
                closest = tops[i];
            } else if (tops[i].top > 0 && tops[i].top <= Math.abs(closest.top)) {
                closest = tops[i];
            } else if (tops[i].top < 0 && -tops[i].top < Math.abs(closest.top)) {
                closest = tops[i];
            }
        }

        return closest;
    }

    return <div className={styles.navContainer}>
        <nav className={styles.nav}>
            <Link href={'#'}>
                <a className={styles.logo}>
                    <div>
                        <Image src={'/images/logo.png'} height={45} width={45} layout={'fixed'} className="avatar"/>
                    </div>
                    <h2 className={styles.name}>Aleix's portfolio</h2>
                </a>
            </Link>

            <ul className={`${styles.ul} ${isMenuOpened ? styles.menuOpened : null}`}>
                <li className={styles.li}>
                    <Link href="#about">
                        <a className={getSelectedLinkClass('about')}>About</a>
                    </Link>
                </li>
                <li className={styles.li}>
                    <Link href="#experience">
                        <a className={getSelectedLinkClass('experience')}>Experience</a>
                    </Link>
                </li>
                <li className={styles.li}>
                    <Link href="#projects">
                        <a className={getSelectedLinkClass('projects')}>Projects</a>
                    </Link>
                </li>
                <li className={styles.li}>
                    <Link href="#contact">
                        <a className={getSelectedLinkClass('contact')}>Contact</a>
                    </Link>
                </li>
            </ul>

            <button className={styles.menu} onClick={() => setIsMenuOpened(!isMenuOpened)}>M</button>

        </nav>
    </div>
}

export default Nav
