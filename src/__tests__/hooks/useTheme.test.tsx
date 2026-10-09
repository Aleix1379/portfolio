import { act, renderHook } from '@testing-library/react'
import useTheme from '../../hooks/useTheme'

beforeEach(() => {
  localStorage.clear()
  document.documentElement.dataset.theme = 'dark'
  document.body.removeAttribute('data-theme')
})

afterEach(() => {
  jest.restoreAllMocks()
  document.documentElement.removeAttribute('data-theme')
  document.body.removeAttribute('data-theme')
})

describe('useTheme', () => {
  it('keeps the theme set by the prepaint script and does not overwrite a saved preference', () => {
    localStorage.setItem('portfolio-theme', 'light')
    document.documentElement.dataset.theme = 'light'
    const save = jest.spyOn(Storage.prototype, 'setItem')
    const { result } = renderHook(() => useTheme())
    expect(result.current[0]).toBe('light')
    expect(document.documentElement).toHaveAttribute('data-theme', 'light')
    expect(document.body).toHaveAttribute('data-theme', 'light')
    expect(save).not.toHaveBeenCalledWith('portfolio-theme', 'dark')
  })

  it('updates the document, compatibility attribute and persistent preference', () => {
    const { result } = renderHook(() => useTheme())
    act(() => result.current[1]('light'))
    expect(result.current[0]).toBe('light')
    expect(document.documentElement).toHaveAttribute('data-theme', 'light')
    expect(document.body).toHaveAttribute('data-theme', 'light')
    expect(localStorage.getItem('portfolio-theme')).toBe('light')
    act(() => result.current[1]('dark'))
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    expect(localStorage.getItem('portfolio-theme')).toBe('dark')
  })

  it('still changes the in-memory theme when storage access throws', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new DOMException('Blocked', 'SecurityError')
    })
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('Blocked', 'SecurityError')
    })
    const { result } = renderHook(() => useTheme())
    expect(result.current[0]).toBe('dark')
    expect(() => act(() => result.current[1]('light'))).not.toThrow()
    expect(result.current[0]).toBe('light')
    expect(document.documentElement).toHaveAttribute('data-theme', 'light')
  })
})
