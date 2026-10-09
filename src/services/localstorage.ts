import type { Theme } from '../types/Theme'
export const themeStorageKey = 'portfolio-theme'
export const getTheme = (): Theme | null => {
  try {
    const saved =
      localStorage.getItem(themeStorageKey) ??
      localStorage.getItem('data-theme')
    return saved === 'dark' || saved === 'light' ? saved : null
  } catch {
    return null
  }
}
export const setTheme = (theme: Theme) => {
  try {
    localStorage.setItem(themeStorageKey, theme)
  } catch {
    // The current page still changes theme when browser storage is unavailable.
  }
}
