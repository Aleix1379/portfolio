import { Theme } from '../types/Theme'

const keys = {
	DATA_THEME: 'data-theme'
}


export const getTheme = (): Theme => {
	const data = localStorage.getItem(keys.DATA_THEME)
	return !data || data === 'dark' ? 'dark' : 'light'
}

export const setTheme = (newTheme: string) => {
	localStorage.setItem(keys.DATA_THEME, newTheme)
}
