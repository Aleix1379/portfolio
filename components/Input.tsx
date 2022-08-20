import React, { useState } from 'react'
import styles from '../styles/Input.module.css'

interface InputProps {
    label: string
    value: string
    placeholder?: string
    onChange: (value: string) => void
    type?: string
    className?: string | undefined;
}

const Input: React.FC<InputProps> = ({ label, value, placeholder, onChange, type = 'text', className }) => {
	const [isLabelActive, setIsLabelActive] = useState(false)

	const getAnimationDelay = (index: number): string => {
		const time = 0.05
		if (!isLabelActive) {
			index = index * -1
		}
		return (index * time) + 's'
	}

	return (
		<label className={`${styles.container} ${className}`}>
			<div className={styles.label}>
				{
					label.split('').map((letter, index) =>
						<span
							key={index}
							className={`${styles.letter} ${isLabelActive ? styles.animated : ''}`}
							style={{ animationDelay: getAnimationDelay(index) }}
						>
							{letter}
						</span>
					)
				}
			</div>
			<div className={styles.wrapper}>
				<input
					className={styles.input}
					type={type}
					placeholder={isLabelActive ? placeholder : ''}
					value={value}
					onChange={e => onChange(e.target.value)}
					onFocus={() => setIsLabelActive(true)}
					onBlur={() => setIsLabelActive(value.length > 0)}
				/>
			</div>
		</label>
	)
}

export default Input
