import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import SwitchTheme from '../../components/SwitchTheme'

describe('SwitchTheme', () => {
  it('announces its current state and requests the opposite theme', () => {
    const onChange = jest.fn()
    const { rerender } = render(<SwitchTheme value onChange={onChange} />)
    const button = screen.getByRole('button', { name: 'Dark theme' })
    expect(button).toHaveAttribute('aria-pressed', 'true')
    expect(button).toHaveAttribute('title', 'Use light theme')
    fireEvent.click(button)
    expect(onChange).toHaveBeenCalledWith(false)
    rerender(<SwitchTheme value={false} onChange={onChange} />)
    expect(button).toHaveAttribute('aria-pressed', 'false')
    expect(button).toHaveAttribute('title', 'Use dark theme')
    fireEvent.click(button)
    expect(onChange).toHaveBeenLastCalledWith(true)
  })
})
