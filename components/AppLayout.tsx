import React from 'react'
import Head from 'next/head'
import Header from './Header'
import Nav from './Nav'
import styles from '../styles/Home.module.css'
import Footer from './Footer'

interface AppLayoutProps {
	children: JSX.Element
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
	return <div className={styles.container}>
		<Head>
			<title>Aleix's portfolio</title>
			<meta name='description' content='Generated by create next app' />
			<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			<link rel='icon' href='/favicon.ico' />
		</Head>

		<Header />

		<Nav />

		{children}

		<Footer />

	</div>
}

export default AppLayout
