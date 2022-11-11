import React, { useEffect } from 'react'
import styles from '../styles/Counter.module.css'

interface CounterProps {
	children: number
	style?: React.CSSProperties
}

const Counter: React.FC<CounterProps> = ({ children, style }) => {
	const [values, setValues] = React.useState<Array<number>>([])

	useEffect(() => {
		const newValues = []
		for (let i = 0; i <= children; i++) {
			newValues.push(i)
		}
		setValues(newValues)
	}, [children])

	return (
		<div className={styles.counter} style={style}>
			<div>
				{
					values.map((value, index) => (
						<div key={index} className={styles.number}>
							{value}
						</div>
					))
				}
			</div>
		</div>
	)
}

export default Counter
