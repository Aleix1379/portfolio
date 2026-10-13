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
        /At Talkual, I worked on an eCommerce platform with Vue.js and Nuxt.js/
      )
    ).toBeInTheDocument()
    expect(screen.getByText(/Node.js, Strapi and PostgreSQL/)).toBeInTheDocument()
    expect(screen.getByText(/My personal projects give me room/)).toBeInTheDocument()
    const paragraphs = container.querySelectorAll('#about > div:last-child p')
    expect(paragraphs).toHaveLength(4)
    expect(paragraphs[0]).toHaveTextContent(/I enjoy working across a product/)
    expect(paragraphs[1]).toHaveTextContent(/At Talkual/)
    expect(paragraphs[2]).toHaveTextContent(/My personal projects/)
    expect(paragraphs[3]).toHaveTextContent(/In teams/)
    expect(
      screen.queryByRole('button', { name: /Download CV/ })
    ).not.toBeInTheDocument()
  })
})
