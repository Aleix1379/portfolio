import styles from '../styles/Footer.module.css'
import Image from 'next/image'

const Footer = () => {
	return (

		<footer className={styles.footer}>
			<Image src={'/images/reactjs.png'} alt={'nextjs'} width={337} height={249} objectFit={'scale-down'} />
			<div>
				<span style={{ color: 'var(--green)' }}>Designed </span>&<span
					style={{ color: 'var(--blue)' }}> Build</span> by Aleix Martínez Pena
			</div>
			<Image
				src={'/images/nextjs.png'}
				alt={'nextjs'}
				width={500}
				height={349}
				objectFit={'scale-down'}
			/>
		</footer>

	)
}

export default Footer
