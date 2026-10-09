import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import Footer from '../../components/Footer'

const { renderToStaticMarkup } = require('react-dom/server.node') as typeof import('react-dom/server')

describe('Footer illustrations', () => {
  let intersection: IntersectionObserverCallback
  let motionChange: () => void
  let reducedMotion: boolean
  let visibility: DocumentVisibilityState
  let assets: HTMLImageElement[]
  const disconnect = jest.fn()
  const removeMotionListener = jest.fn()

  beforeEach(() => {
    reducedMotion = false
    visibility = 'visible'
    assets = []
    disconnect.mockClear()
    removeMotionListener.mockClear()
    Object.defineProperty(document, 'visibilityState', {
      configurable: true, get: () => visibility
    })
    Object.defineProperty(window, 'matchMedia', {
      configurable: true, writable: true,
      value: jest.fn(() => ({
        get matches() { return reducedMotion },
        addEventListener: (_event: string, listener: () => void) => { motionChange = listener },
        removeEventListener: removeMotionListener
      }))
    })
    Object.defineProperty(window, 'IntersectionObserver', {
      configurable: true, writable: true,
      value: jest.fn((callback: IntersectionObserverCallback) => {
        intersection = callback
        return { observe: jest.fn(), disconnect }
      })
    })
    jest.spyOn(window, 'Image').mockImplementation(() => {
      const image = document.createElement('img')
      const isReact = assets.length === 0
      Object.defineProperty(image, 'naturalWidth', {
        value: isReact ? 720 : 540, configurable: true
      })
      Object.defineProperty(image, 'naturalHeight', {
        value: isReact ? 540 : 675, configurable: true
      })
      assets.push(image)
      return image
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
    Reflect.deleteProperty(document, 'visibilityState')
  })

  const inViewport = (ratio: number) => act(() => intersection([
    { isIntersecting: ratio > 0, intersectionRatio: ratio } as IntersectionObserverEntry
  ], {} as IntersectionObserver))
  const loadLayers = () => assets.forEach(image => fireEvent.load(image))
  const footer = () => screen.getByRole('contentinfo')

  it('renders two static accessible illustrations without JavaScript', () => {
    const html = renderToStaticMarkup(<Footer />)
    expect(html).toContain('data-animating="false"')
    expect(html).toContain('/images/footer-react.webp')
    expect(html).toContain('/images/footer-astro.webp')
    expect(html).not.toContain('/images/footer-react-figure.webp')
    expect(html).not.toContain('nextjs')
  })

  it('waits for visibility and all layers before hiding the static compositions', () => {
    render(<Footer />)
    expect(assets).toHaveLength(3)
    expect(assets.every(image => !image.hasAttribute('src'))).toBe(true)
    inViewport(0.14)
    expect(assets.every(image => !image.hasAttribute('src'))).toBe(true)
    inViewport(0.15)
    expect(assets[0]).toHaveAttribute('src', '/images/footer-react-figure.webp')
    fireEvent.load(assets[0])
    fireEvent.load(assets[1])
    expect(footer()).toHaveAttribute('data-animating', 'false')
    fireEvent.load(assets[2])
    expect(footer()).toHaveAttribute('data-animating', 'true')
    expect(screen.getAllByRole('img')).toHaveLength(2)
    expect(screen.getByRole('img', { name: 'Illustration of Aleix beside the React symbol' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Faceted Astro logo' })).toBeInTheDocument()
  })

  it('pauses outside the viewport and resumes without replacing animation layers', () => {
    render(<Footer />)
    inViewport(1)
    loadLayers()
    const layers = footer().querySelectorAll('[aria-hidden="true"]')
    inViewport(0)
    expect(footer()).toHaveAttribute('data-animating', 'false')
    inViewport(1)
    expect(footer()).toHaveAttribute('data-animating', 'true')
    expect(footer().querySelectorAll('[aria-hidden="true"]')[0]).toBe(layers[0])
    expect(assets).toHaveLength(3)
  })

  it('does not request animation layers with reduced motion, and handles preference changes', () => {
    reducedMotion = true
    render(<Footer />)
    inViewport(1)
    expect(assets.every(image => !image.hasAttribute('src'))).toBe(true)
    act(() => { reducedMotion = false; motionChange() })
    loadLayers()
    expect(footer()).toHaveAttribute('data-animating', 'true')
    act(() => { reducedMotion = true; motionChange() })
    expect(footer()).toHaveAttribute('data-animating', 'false')
  })

  it('pauses with a hidden tab and resumes when the tab returns', () => {
    render(<Footer />)
    inViewport(1)
    loadLayers()
    act(() => { visibility = 'hidden'; document.dispatchEvent(new Event('visibilitychange')) })
    expect(footer()).toHaveAttribute('data-animating', 'false')
    act(() => { visibility = 'visible'; document.dispatchEvent(new Event('visibilitychange')) })
    expect(footer()).toHaveAttribute('data-animating', 'true')
  })

  it('retains both static images if any animation layer fails', () => {
    render(<Footer />)
    inViewport(1)
    fireEvent.load(assets[0])
    fireEvent.error(assets[1])
    fireEvent.load(assets[2])
    expect(footer()).toHaveAttribute('data-animating', 'false')
    expect(footer().querySelector('[aria-hidden="true"]')).toBeNull()
    expect(screen.getAllByRole('img')).toHaveLength(2)
  })

  it('rejects unexpected layer dimensions', () => {
    render(<Footer />)
    Object.defineProperty(assets[2], 'naturalHeight', { value: 600 })
    inViewport(1)
    loadLayers()
    expect(footer()).toHaveAttribute('data-animating', 'false')
  })

  it('disconnects observers and removes handlers when unmounted', () => {
    const removeVisibilityListener = jest.spyOn(document, 'removeEventListener')
    const { unmount } = render(<Footer />)
    unmount()
    expect(disconnect).toHaveBeenCalledTimes(1)
    expect(removeMotionListener).toHaveBeenCalledWith('change', expect.any(Function))
    expect(removeVisibilityListener).toHaveBeenCalledWith('visibilitychange', expect.any(Function))
    expect(assets.every(image => image.onload === null && image.onerror === null)).toBe(true)
  })

  it('keeps static compositions if IntersectionObserver is unavailable', () => {
    Reflect.deleteProperty(window, 'IntersectionObserver')
    render(<Footer />)
    expect(footer()).toHaveAttribute('data-animating', 'false')
    expect(assets).toHaveLength(0)
  })
})
