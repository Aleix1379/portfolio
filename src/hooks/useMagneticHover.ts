import { useEffect, useRef } from 'react'

interface MagneticHoverOptions {
  strengthX?: number
  strengthY?: number
  scale?: number
}

const useMagneticHover = <T extends HTMLElement>({
  strengthX = 0.16,
  strengthY = 0.3,
  scale = 1.05
}: MagneticHoverOptions = {}) => {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const element = ref.current

    if (!element) {
      return
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return
    }

    const onMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = event.clientX - rect.left - rect.width / 2
      const y = event.clientY - rect.top - rect.height / 2

      element.style.transform = `translate(${x * strengthX}px, ${y * strengthY}px) scale(${scale})`
    }

    const onLeave = () => {
      element.style.transform = ''
    }

    element.addEventListener('mousemove', onMove)
    element.addEventListener('mouseleave', onLeave)

    return () => {
      element.removeEventListener('mousemove', onMove)
      element.removeEventListener('mouseleave', onLeave)
      element.style.transform = ''
    }
  }, [scale, strengthX, strengthY])

  return ref
}

export default useMagneticHover
