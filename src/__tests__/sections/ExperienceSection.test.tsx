import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import ExperienceSection from '../../sections/ExperienceSection'
import { getExperience } from '../../services/experience'

const { renderToStaticMarkup } =
  require('react-dom/server.node') as typeof import('react-dom/server')

describe('ExperienceSection', () => {
  it('features the three full-time roles and keeps the remaining history without duplicates', () => {
    const { container } = render(<ExperienceSection />)
    const articles = screen.getAllByRole('article', { hidden: true })
    expect(articles).toHaveLength(getExperience().length)
    expect(articles[0]).toHaveTextContent('TALKUAL')
    const talkual = getExperience().find(job => job.company === 'TALKUAL')!
    expect(talkual.responsibilities).toHaveLength(3)
    expect(talkual.responsibilities.every(point => point.length < 100)).toBe(true)
    expect(articles[0]).not.toHaveTextContent(/Notion|weekly prioritisation|marketing|customer support/)
    expect(articles[1]).toHaveTextContent('Movetia')
    expect(articles[2]).toHaveTextContent('Ubiquat Technologies')
    expect(articles[2]).toHaveTextContent('AngularJS')
    expect(articles[3]).toHaveTextContent('Coach4Pro')
    const companies = articles.map(article => article.textContent)
    expect(new Set(companies).size).toBe(articles.length)
    for (const article of articles.slice(0, 3)) expect(article).toBeVisible()
    for (const article of articles.slice(3)) expect(article).not.toBeVisible()
    const details = container.querySelector('details')!
    expect(details.querySelector('summary')).toHaveTextContent(
      'View full experience'
    )
    details.open = true
    fireEvent(details, new Event('toggle'))
    for (const article of articles) expect(article).toBeVisible()
    expect(details.querySelector('summary')).toHaveTextContent(
      'Show less experience'
    )
    details.open = false
    fireEvent(details, new Event('toggle'))
    for (const article of articles.slice(3)) expect(article).not.toBeVisible()
    expect(details.querySelector('summary')).toHaveTextContent(
      'View full experience'
    )
  })

  it('includes older experience inside a native details element without JavaScript', () => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = renderToStaticMarkup(<ExperienceSection />)
    const details = wrapper.querySelector('details')!
    expect(details).not.toHaveAttribute('open')
    expect(details.querySelectorAll('article')).toHaveLength(
      getExperience().length - 3
    )
    expect(details.querySelector('summary')).toHaveTextContent(
      'View full experience'
    )
  })
})
