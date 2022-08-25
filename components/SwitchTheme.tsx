import React from 'react'
import styles from '../styles/Switch.module.css'
import Image from 'next/image'

interface SwitchProps {
	value: boolean
	onChange: (value: boolean) => void
	size?: number
	className?: string | undefined
}

const SwitchTheme: React.FC<SwitchProps> = ({ value, onChange, size = 35, className }) => {

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
		<div className={styles.container}>
			<div className={styles.wrapper} style={getWrapperStyle()}>
				<div
					className={`${styles.switch} ${className}`}
					style={getContainerStyle()}
					onClick={() => onChange(!value)}
				>

					<Image
						className={`${styles.off} ${getStatusStyle(value, 'off')}`}
						src={'/images/moon.png'}
						width={size}
						height={size}
					/>

					<div
						className={`${styles.selector} ${getSelectorAnimation(value)}`}
						style={getSelectorStyle()} />

					<Image
						className={`${styles.on} ${getStatusStyle(value, 'on')}`}
						src={'/images/sun.png'}
						width={size}
						height={size}
					/>
				</div>
			</div>
		</div>
	)
}

export default SwitchTheme
