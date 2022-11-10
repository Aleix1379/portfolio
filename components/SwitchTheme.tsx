import React from 'react'
import styles from '../styles/SwitchTheme.module.css'
import Image from 'next/image'

interface SwitchProps {
	value: boolean
	onChange: (value: boolean) => void
	size?: number
	className?: string | undefined
}

const SwitchTheme: React.FC<SwitchProps> = ({ value, onChange, size = 35, className }) => {

	const switchOn = () => {
		const element = document.getElementById('switch')
		if (element) {
			element.classList.remove(styles.switchOff)
			element.classList.add(styles.switchOn)
		}
	}

	const switchOff = () => {
		const element = document.getElementById('switch')
		if (element) {
			element.classList.remove(styles.switchOn)
			element.classList.add(styles.switchOff)
		}
	}

	const getStatusStyle = (isActive: boolean, control: 'off' | 'on') => {
		if (control === 'off' && isActive) {
			return styles.statusVisible
		} else if (control === 'on' && !isActive) {
			return styles.statusVisible
		}
	}

	const getSelectorAnimation = (isActive: boolean) => {
		if (isActive) {
			return styles.selectorActive
		}
		return styles.selectorInActive
	}

	const getWith = () => {
		return size * 2 + 50
	}

	const getHeight = () => {
		return getWith() * .5
	}

	const getSelectorSize = () => {
		return getHeight() * 0.55
	}

	const getContainerStyle = () => {
		return {
			width: getWith(),
			height: getHeight(),
			borderRadius: getHeight() * .5
		}
	}

	const getWrapperStyle = () => {
		return {
			width: getWith() + 8,
			maxWidth: getWith() + 8,
			height: getHeight() + 8,
			top: 2,
			borderRadius: getHeight() * .75
		}
	}

	const getSelectorStyle = () => {
		return {
			height: getSelectorSize(),
			width: getSelectorSize(),
			minWidth: getSelectorSize()
		}
	}

	return (
		<div className={styles.switch} style={getWrapperStyle()}>
			<div
				id='switch'
				className={`${styles.wrapper} ${className}`}
				style={getContainerStyle()}
				onClick={() => onChange(!value)}
				onMouseEnter={switchOn}
				onMouseLeave={switchOff}
			>

				<Image
					className={`${styles.off} ${getStatusStyle(value, 'off')}`}
					src={'/images/moon.webp'}
					width={size}
					height={size}
					alt='moon'
				/>

				<div
					className={`${styles.selector} ${getSelectorAnimation(value)}`}
					style={getSelectorStyle()}
				/>

				<Image
					className={`${styles.on} ${getStatusStyle(value, 'on')}`}
					src={'/images/sun.png'}
					width={size}
					height={size}
					alt='sun'
				/>
			</div>
		</div>
	)
}

export default SwitchTheme
