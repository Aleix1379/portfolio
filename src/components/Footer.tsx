import { useEffect, useRef, useState } from 'react'
import styles from '../styles/Footer.module.css'

const animationAssets = [
  { src: '/images/footer-react-figure.webp', width: 720, height: 540 },
  { src: '/images/footer-astro-body.webp', width: 540, height: 675 },
  { src: '/images/footer-astro-flame.webp', width: 540, height: 675 }
]
// Matches the sphere's measured center in the generated foreground layer.
const reactCenter = { x: 443, y: 271 }

const Footer = () => {
  const ref = useRef<HTMLElement>(null)
  const [isReady, setIsReady] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (!ref.current || !('IntersectionObserver' in window)) return
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const images = animationAssets.map(() => new window.Image())
    const loaded = new Set<number>()
    let visible = false
    let requested = false
    let failed = false
    let disposed = false

    const sync = () => {
      if (disposed) return
      const allowed = visible && !motion.matches && document.visibilityState === 'visible'
      if (allowed && !requested) {
        requested = true
        images.forEach((image, index) => { image.src = animationAssets[index].src })
      }
      const ready = !failed && loaded.size === images.length
      setIsReady(ready)
      setIsAnimating(allowed && ready)
    }

    images.forEach((image, index) => {
      image.onload = () => {
        const expected = animationAssets[index]
        if (image.naturalWidth === expected.width && image.naturalHeight === expected.height) {
          loaded.add(index)
        } else {
          failed = true
        }
        sync()
      }
      image.onerror = () => { failed = true; sync() }
    })
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.15
      sync()
    }, { threshold: [0, 0.15] })
    observer.observe(ref.current)
    motion.addEventListener('change', sync)
    document.addEventListener('visibilitychange', sync)
    return () => {
      disposed = true
      observer.disconnect()
      motion.removeEventListener('change', sync)
      document.removeEventListener('visibilitychange', sync)
      images.forEach(image => { image.onload = null; image.onerror = null })
    }
  }, [])

  return (
    <footer ref={ref} className={styles.footer} data-animating={isAnimating}>
      <span className={styles.reactIllustration}>
        <img className={styles.base} src="/images/footer-react.webp"
          alt="Illustration of Aleix beside the React symbol"
          width={720} height={540} loading="lazy" />
        {isReady && <span className={styles.layers} aria-hidden="true">
          <svg className={styles.orbits} viewBox="0 0 720 540" aria-hidden="true" focusable="false">
            <g className={styles.orbitMotion}
              style={{ transformOrigin: reactCenter.x + 'px ' + reactCenter.y + 'px' }}
              fill="none" stroke="#61dafb" strokeWidth={3}>
              {[0, 60, 120].map(angle => <ellipse key={angle}
                cx={reactCenter.x} cy={reactCenter.y} rx={210} ry={80}
                transform={'rotate(' + angle + ' ' + reactCenter.x + ' ' + reactCenter.y + ')'} />)}
            </g>
          </svg>
          <img src="/images/footer-react-figure.webp" alt="" width={720} height={540} />
        </span>}
      </span>
      <div className={styles.credit}>
        <span style={{ color: 'var(--green)' }}>Designed </span>&
        <span style={{ color: 'var(--blue)' }}> Build</span> by Aleix Martínez Pena
      </div>
      <span className={styles.astroIllustration}>
        <img className={styles.base} src="/images/footer-astro.webp"
          alt="Faceted Astro logo" width={540} height={675} loading="lazy" />
        {isReady && <span className={styles.layers} aria-hidden="true">
          <img src="/images/footer-astro-body.webp" alt="" width={540} height={675} />
          <img className={styles.flame} src="/images/footer-astro-flame.webp"
            alt="" width={540} height={675} />
        </span>}
      </span>
    </footer>
  )
}

export default Footer
