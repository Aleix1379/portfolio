import { useEffect, useRef } from 'react'
import type { PointerEvent } from 'react'

export const useCardTilt = () => {
  const ref = useRef<HTMLDivElement>(null)
  const bounds = useRef<DOMRect | null>(null)
  const scroll = useRef({ x: 0, y: 0 })
  const frame = useRef<number | null>(null)

  const reset = () => {
    if (frame.current !== null) cancelAnimationFrame(frame.current)
    frame.current = null
    bounds.current = null
    const card = ref.current
    if (!card) return
    card.style.removeProperty('--tilt-x')
    card.style.removeProperty('--tilt-y')
    card.style.removeProperty('--tilt-shadow-x')
    card.style.removeProperty('--tilt-shadow-y')
    card.removeAttribute('data-tilting')
  }

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleMotionChange = () => {
      if (motion.matches) reset()
    }
    motion.addEventListener('change', handleMotionChange)
    window.addEventListener('blur', reset)
    return () => {
      motion.removeEventListener('change', handleMotionChange)
      window.removeEventListener('blur', reset)
      if (frame.current !== null) cancelAnimationFrame(frame.current)
    }
  }, [])

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (
      event.pointerType !== 'mouse' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !ref.current
    )
      return

    // Keep the hit area stable while the card itself rotates.
    if (!bounds.current) {
      bounds.current = ref.current.getBoundingClientRect()
      scroll.current = { x: window.scrollX, y: window.scrollY }
    }
    const rect = bounds.current
    const x = Math.max(
      0,
      Math.min(
        1,
        (event.clientX - rect.left + window.scrollX - scroll.current.x) /
          rect.width
      )
    )
    const y = Math.max(
      0,
      Math.min(
        1,
        (event.clientY - rect.top + window.scrollY - scroll.current.y) /
          rect.height
      )
    )
    if (frame.current !== null) cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      frame.current = null
      const card = ref.current
      if (!card) return
      card.style.setProperty('--tilt-x', `${(0.5 - y) * 16}deg`)
      card.style.setProperty('--tilt-y', `${(x - 0.5) * 20}deg`)
      card.style.setProperty('--tilt-glare-x', `${x * 100}%`)
      card.style.setProperty('--tilt-glare-y', `${y * 100}%`)
      card.style.setProperty('--tilt-shadow-x', `${(0.5 - x) * 20}px`)
      card.style.setProperty('--tilt-shadow-y', `${18 + (0.5 - y) * 12}px`)
      card.setAttribute('data-tilting', 'true')
    })
  }

  return { ref, onPointerMove, onPointerLeave: reset, onPointerCancel: reset }
}
