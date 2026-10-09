import React from 'react'
import { render, screen } from '@testing-library/react'
import Footer from '../../components/Footer'

const { renderToStaticMarkup } =
  require('react-dom/server.node') as typeof import('react-dom/server')

describe('Footer', () => {
  it('provides native links back to the beginning of the page', () => {
    render(<Footer />)
    expect(screen.getByRole('contentinfo')).toHaveTextContent(
      'Designed & built by Aleix Martínez Pena'
    )
    expect(
      screen.getByRole('link', { name: 'Aleix, back to top' })
    ).toHaveAttribute('href', '#header')
    expect(screen.getByRole('link', { name: 'Back to top' })).toHaveAttribute(
      'href',
      '#header'
    )
  })

  it('renders its content and links without client JavaScript', () => {
    const html = renderToStaticMarkup(<Footer />)
    expect(html).toContain('href="#header"')
    expect(html).toContain('Aleix Martínez Pena')
    expect(html).not.toContain('<button')
  })
})
