import { useEffect, useState } from 'react'
import { getTheme, setTheme } from '../services/localstorage'
import type { Theme } from '../types/Theme'


const useTheme = (initialState: Theme = 'dark'): [Theme, (theme: Theme) => void] => {
	const [state, setState] = useState<Theme>(initialState)

	useEffect(() => {
		const currentTheme = getTheme()
		if (currentTheme && currentTheme !== state) {
			setState(currentTheme)
		}

	}, [])

	useEffect(() => {
		updateTheme()
	}, [state])

	const updateTheme = () => {
		const body = document.getElementsByTagName('body')[0]
		body.setAttribute('data-theme', state)
		setTheme(state)
	}

	return [state, setState]
}

export default useTheme
