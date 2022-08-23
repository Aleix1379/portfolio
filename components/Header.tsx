import { useState } from 'react'
import styles from '../styles/Header.module.css'

const Header = () => {
	const [name] = useState('I\'m Aleix.')
	const [description] = useState('A front end developer.')

	const renderAnimatedText = (text: string, animationDelay = .1) => {
		return text.split('').map((letter, index) => (
			<span
				key={index}
				className={styles.letter}
				style={{
					animationDelay: `${(index * 0.075) + animationDelay}s`,
					marginLeft: letter === ' ' ? 15 : 0
				}}
			>
				{letter}
			</span>
		))
	}

	return (
		<div id='header' className={styles.header}>
			<div>
				<h2 className={`${styles.name} ${styles.text}`}>
					{renderAnimatedText(name)}
				</h2>
				<h2 className={`${styles.name} ${styles.text}`}>
					{renderAnimatedText(description, name.length * 0.1)}
				</h2>
			</div>
		</div>
	)
}

export default Header
