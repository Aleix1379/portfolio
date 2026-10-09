import React, { useEffect, useRef, useState } from 'react'
import styles from '../styles/AboutIllustration.module.css'

const spriteSource = '/images/about-activity-sprite.webp'
const spriteSize = 720 * 3

interface AboutIllustrationProps {
  className?: string
}

const AboutIllustration = ({ className }: AboutIllustrationProps) => {
  const ref = useRef<HTMLSpanElement>(null)
  const [isReady, setIsReady] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (!ref.current || !('IntersectionObserver' in window)) return

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sprite = new window.Image()
    let visible = false
    let loaded = false
    let requested = false
    let disposed = false

    const sync = () => {
      if (disposed) return
      const allowed = visible && !motion.matches && document.visibilityState === 'visible'

      if (allowed && !requested) {
        requested = true
        sprite.src = spriteSource
      }

      setIsReady(loaded)
      setIsAnimating(allowed && loaded)
    }

    sprite.onload = () => {
      loaded = sprite.naturalWidth === spriteSize && sprite.naturalHeight === spriteSize
      sync()
    }
    sprite.onerror = () => {
      loaded = false
      sync()
    }

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
      sprite.onload = null
      sprite.onerror = null
    }
  }, [])

  return (
    <span
      ref={ref}
      className={`${styles.illustration} ${className ?? ''}`}
      data-animating={isAnimating}>
      <img
        src="/images/about-aleix.webp"
        alt="Illustration of Aleix sitting with a laptop"
        width={1254}
        height={1254}
        loading="eager"
      />
      {isReady && <span className={styles.activity} aria-hidden="true" />}
    </span>
  )
}

export default AboutIllustration
