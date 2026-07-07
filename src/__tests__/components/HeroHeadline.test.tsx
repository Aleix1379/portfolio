import React from 'react'
import { render, screen } from '@testing-library/react'
import HeroHeadline from '../../components/HeroHeadline'

describe('HeroHeadline Component', () => {
  it('keeps the animated headline semantic and accessible', () => {
    render(
      <HeroHeadline
        lines={['Product-focused', 'full-stack developer.']}
      />
    )

    const heading = screen.getByRole('heading', {
      level: 1,
      name: 'Product-focused full-stack developer.'
    })

    expect(heading).toBeInTheDocument()
    expect(heading.querySelector('[aria-hidden="true"]')).toBeInTheDocument()
    expect(heading).toHaveTextContent(
      'Product-focused full-stack developer.'
    )
  })
})
