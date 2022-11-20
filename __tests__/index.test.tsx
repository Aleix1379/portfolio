import React from 'react'
import { render } from '@testing-library/react'
import Home from '../pages/index'

jest.mock('next/router', () => ({
	useRouter() {
		return {
			route: '/',
			pathname: '',
			query: '',
			asPath: ''
		}
	}
}
))

describe('Home', () => {
	it('renders', () => {
		render(<Home />)
	})
})
