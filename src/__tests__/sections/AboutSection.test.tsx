import React from 'react'
import { render, screen } from '@testing-library/react'
import AboutSection from '../../sections/AboutSection'

describe('AboutSection', () => {
  it('has a labelled section and describes the work without a floating CV control', () => {
    const { container } = render(<AboutSection />)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(container.querySelector('#about')).toHaveAttribute(
      'aria-labelledby',
      heading.id
    )
    expect(
      screen.getByText(
        /commerce, subscriptions, logistics integrations and mobile applications/
      )
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: /Download CV/ })
    ).not.toBeInTheDocument()
  })
})
