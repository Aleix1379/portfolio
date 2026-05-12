import { useEffect, useLayoutEffect, useRef } from 'react'

interface RevealOptions {
  rootMargin?: string
  threshold?: number | number[]
}

const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect

const useReveal = <T extends HTMLElement>({
  rootMargin = '0px 0px -12% 0px',
  threshold = 0.18
}: RevealOptions = {}) => {
  const ref = useRef<T | null>(null)

  useIsomorphicLayoutEffect(() => {
    const element = ref.current

    if (!element) {
      return
    }

    const markVisible = () => {
      element.setAttribute('data-reveal-ready', 'true')
      element.setAttribute('data-reveal-visible', 'true')
    }

    const markHidden = () => {
      element.setAttribute('data-reveal-ready', 'true')
      element.setAttribute('data-reveal-visible', 'false')
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      markVisible()
      return
    }

    const { top, bottom } = element.getBoundingClientRect()
    const isInitiallyVisible =
      top < window.innerHeight * 0.92 && bottom > window.innerHeight * 0.08

    if (isInitiallyVisible) {
      markVisible()
      return
    }

    markHidden()

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0]

        if (!entry?.isIntersecting) {
          return
        }

        markVisible()
        observer.disconnect()
      },
      { rootMargin, threshold }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [rootMargin, threshold])

  return ref
}

export default useReveal
