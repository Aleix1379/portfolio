import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import Home from '../pages/index'
import Input from '../components/Input'

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

describe('Test contact form', () => {
	it('Test subject change', () => {
		const testID = 'contact-form-subject'
		const onChange = jest.fn()
		const { getByTestId } = render(<Input testID={testID} label={'Subject'} value={''} onChange={onChange} />)

		const input = getByTestId(testID)

		const subjectMessage = 'Hello!!!'
		fireEvent.change(input, { target: { value: subjectMessage } })

		expect(onChange).toHaveBeenCalledWith(subjectMessage)
	})

	it('Test message change', () => {
		const testID = 'contact-form-message'
		const onChange = jest.fn()
		const { getByTestId } = render(<Input testID={testID} label={'Message'} value={''} onChange={onChange} />)

		const input = getByTestId(testID)

		const message = 'How are you?'
		fireEvent.change(input, { target: { value: message } })

		expect(onChange).toHaveBeenCalledWith(message)
	})
})

