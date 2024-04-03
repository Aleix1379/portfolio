import styles from '../styles/Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <img
        src={'/images/reactjs.webp'}
        alt={'nextjs'}
        style={{ width: '337px', height: '249px', objectFit: 'scale-down' }}
      />
      <div style={{ textWrap: 'balance' }}>
        <span style={{ color: 'var(--green)' }}>Designed </span>&
        <span style={{ color: 'var(--blue)' }}> Build</span> by Aleix Martínez
        Pena
      </div>
      <img
        src={'/images/astro.png'}
        alt={'nextjs'}
        className={styles.logoNextJs}
        width={170}
        height={214}
      />
    </footer>
  )
}

export default Footer
