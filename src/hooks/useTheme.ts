import { useCallback, useEffect, useState } from 'react'
import { getTheme, setTheme as persistTheme } from '../services/localstorage'
import type { Theme } from '../types/Theme'
const applyTheme = (theme: Theme) => {
  document.documentElement.dataset.theme = theme
  document.body.dataset.theme = theme
}
const useTheme = (
  initialState: Theme = 'dark'
): [Theme, (theme: Theme) => void] => {
  const [theme, setState] = useState<Theme>(initialState)
  useEffect(() => {
    const renderedTheme = document.documentElement.dataset.theme
    const current =
      getTheme() ?? (renderedTheme === 'light' ? 'light' : initialState)
    applyTheme(current)
    setState(current)
  }, [initialState])
  const setTheme = useCallback((next: Theme) => {
    applyTheme(next)
    persistTheme(next)
    setState(next)
  }, [])
  return [theme, setTheme]
}
export default useTheme
