import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import AboutIllustration from '../../components/AboutIllustration'

describe('AboutIllustration', () => {
  let intersection: IntersectionObserverCallback
  let motionChange: () => void
  let reducedMotion: boolean
  let visibility: DocumentVisibilityState
  let sprites: HTMLImageElement[]
  const disconnect = jest.fn()
  const removeMotionListener = jest.fn()

  beforeEach(() => {
    reducedMotion = false
    visibility = 'visible'
    sprites = []
    disconnect.mockClear()
    removeMotionListener.mockClear()

    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      get: () => visibility
    })
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      writable: true,
      value: jest.fn(() => ({
        get matches() { return reducedMotion },
        addEventListener: (_event: string, listener: () => void) => { motionChange = listener },
        removeEventListener: removeMotionListener
      }))
    })
    Object.defineProperty(window, 'IntersectionObserver', {
      configurable: true,
      writable: true,
      value: jest.fn((callback: IntersectionObserverCallback) => {
        intersection = callback
        return { observe: jest.fn(), disconnect }
      })
    })
    jest.spyOn(window, 'Image').mockImplementation(() => {
      const sprite = document.createElement('img')
      Object.defineProperty(sprite, 'naturalWidth', { value: 2160, configurable: true })
      Object.defineProperty(sprite, 'naturalHeight', { value: 2160, configurable: true })
      sprites.push(sprite)
      return sprite
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
    // Restore jsdom's visibility getter for other tests.
    Reflect.deleteProperty(document, 'visibilityState')
  })

  const setInViewport = (visible: boolean) => {
    act(() => intersection([
      { isIntersecting: visible, intersectionRatio: visible ? 1 : 0 } as IntersectionObserverEntry
    ], {} as IntersectionObserver))
  }

  it('keeps one accessible static image until the visible sprite has loaded', () => {
    render(<AboutIllustration />)
    const image = screen.getByRole('img', { name: 'Illustration of Aleix sitting with a laptop' })
    const illustration = image.parentElement!
    expect(illustration).toHaveAttribute('data-animating', 'false')
    expect(sprites[0]).not.toHaveAttribute('src')

    setInViewport(true)
    expect(sprites[0]).toHaveAttribute('src', '/images/about-activity-sprite.webp')
    expect(illustration).toHaveAttribute('data-animating', 'false')
    fireEvent.load(sprites[0])

    expect(illustration).toHaveAttribute('data-animating', 'true')
    expect(screen.getAllByRole('img')).toHaveLength(1)
    expect(illustration.querySelector('[aria-hidden="true"]')).toBeInTheDocument()
  })

  it('pauses offscreen and resumes with the already loaded sprite', () => {
    render(<AboutIllustration />)
    const illustration = screen.getByRole('img').parentElement!
    setInViewport(true)
    fireEvent.load(sprites[0])
    setInViewport(false)
    expect(illustration).toHaveAttribute('data-animating', 'false')
    setInViewport(true)
    expect(illustration).toHaveAttribute('data-animating', 'true')
    expect(sprites).toHaveLength(1)
  })

  it('lets the visitor pause and resume without replacing the loaded sprite', () => {
    render(<AboutIllustration />)
    const illustration = screen.getByRole('img').parentElement!
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    setInViewport(true)
    fireEvent.load(sprites[0])
    const sprite = illustration.querySelector('[aria-hidden="true"]')
    const pause = screen.getByRole('button', { name: 'Pause animation' })
    pause.focus()
    fireEvent.click(pause)
    expect(illustration).toHaveAttribute('data-paused', 'true')
    expect(screen.getByRole('button', { name: 'Resume animation' })).toHaveFocus()
    setInViewport(false)
    setInViewport(true)
    visibility = 'hidden'
    fireEvent(document, new Event('visibilitychange'))
    visibility = 'visible'
    fireEvent(document, new Event('visibilitychange'))
    expect(illustration).toHaveAttribute('data-paused', 'true')
    fireEvent.click(screen.getByRole('button', { name: 'Resume animation' }))
    expect(illustration).toHaveAttribute('data-paused', 'false')
    expect(illustration.querySelector('[aria-hidden="true"]')).toBe(sprite)
    expect(sprites).toHaveLength(1)
  })

  it('respects reduced motion initially and when the preference changes', () => {
    reducedMotion = true
    render(<AboutIllustration />)
    const illustration = screen.getByRole('img').parentElement!
    setInViewport(true)
    expect(sprites[0]).not.toHaveAttribute('src')
    expect(illustration).toHaveAttribute('data-animating', 'false')

    act(() => { reducedMotion = false; motionChange() })
    fireEvent.load(sprites[0])
    expect(illustration).toHaveAttribute('data-animating', 'true')
    act(() => { reducedMotion = true; motionChange() })
    expect(illustration).toHaveAttribute('data-animating', 'false')
  })

  it('pauses when the document is hidden and resumes when visible', () => {
    render(<AboutIllustration />)
    const illustration = screen.getByRole('img').parentElement!
    setInViewport(true)
    fireEvent.load(sprites[0])
    visibility = 'hidden'
    fireEvent(document, new Event('visibilitychange'))
    expect(illustration).toHaveAttribute('data-animating', 'false')
    visibility = 'visible'
    fireEvent(document, new Event('visibilitychange'))
    expect(illustration).toHaveAttribute('data-animating', 'true')
  })

  it('keeps the static illustration when the sprite fails to load', () => {
    render(<AboutIllustration />)
    const illustration = screen.getByRole('img').parentElement!
    setInViewport(true)
    fireEvent.error(sprites[0])
    expect(illustration).toHaveAttribute('data-animating', 'false')
    expect(illustration.querySelector('[aria-hidden="true"]')).toBeNull()
    expect(screen.getByRole('img')).toHaveAttribute('src', '/images/about-aleix.webp')
  })

  it('cleans up observers, media listeners and pending image handlers', () => {
    const { unmount } = render(<AboutIllustration />)
    setInViewport(true)
    unmount()
    expect(disconnect).toHaveBeenCalledTimes(1)
    expect(removeMotionListener).toHaveBeenCalledWith('change', expect.any(Function))
    expect(sprites[0].onload).toBeNull()
    expect(sprites[0].onerror).toBeNull()
  })

  it('keeps the original image when a loaded sprite has the wrong grid dimensions', () => {
    render(<AboutIllustration />)
    const illustration = screen.getByRole('img').parentElement!
    setInViewport(true)
    Object.defineProperty(sprites[0], 'naturalHeight', { value: 720 })
    fireEvent.load(sprites[0])
    expect(illustration).toHaveAttribute('data-animating', 'false')
    expect(illustration.querySelector('[aria-hidden="true"]')).toBeNull()
    expect(screen.getByRole('img')).toHaveAttribute('src', '/images/about-aleix.webp')
  })

  it('keeps the static image when IntersectionObserver is unavailable', () => {
    Reflect.deleteProperty(window, 'IntersectionObserver')
    render(<AboutIllustration />)
    expect(screen.getByRole('img').parentElement).toHaveAttribute('data-animating', 'false')
    expect(sprites).toHaveLength(0)
  })
})
