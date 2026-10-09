import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Project from '../../components/Project'

const { renderToStaticMarkup } =
  require('react-dom/server.node') as typeof import('react-dom/server')

const project: React.ComponentProps<typeof Project> = {
  name: 'Example product',
  description: 'A useful product for sharing wish lists.',
  image: '/images/logo.png',
  preview: {
    src: '/images/preview.webp',
    alt: 'The list and gift reservation screens',
    width: 960,
    height: 600
  },
  contribution: 'I built the interface and services behind it.',
  featuredTechnologies: ['React', 'TypeScript'],
  links: [{ url: 'https://example.com', text: 'View product', icon: 'web' }],
  apps: [
    {
      id: 'mobile',
      name: 'Mobile app',
      platform: 'mobile',
      description: 'Mobile implementation',
      technologies: []
    },
    {
      id: 'web',
      name: 'Web app',
      platform: 'web',
      description: 'Web implementation',
      technologies: []
    },
    {
      id: 'backend',
      name: 'API',
      platform: 'backend',
      description: 'Backend implementation',
      technologies: []
    }
  ]
}

function openDetails(container: HTMLElement) {
  const details = container.querySelector('details')!
  details.open = true
  fireEvent(details, new Event('toggle'))
}

describe('Project', () => {
  it('shows the product preview, contribution and explicit external action', () => {
    render(<Project {...project} />)
    expect(
      screen.getByRole('heading', { level: 3, name: project.name })
    ).toBeInTheDocument()
    const image = screen.getByRole('img', { name: project.preview!.alt })
    expect(image).toHaveAttribute('width', '960')
    expect(image).toHaveAttribute('height', '600')
    expect(screen.getByText(project.contribution!)).toBeInTheDocument()
    const action = screen.getByRole('link', {
      name: /View product.*Example product.*opens in a new tab/
    })
    expect(action).toHaveAttribute('href', 'https://example.com')
    expect(action).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('uses one selected tab and connects tabs to their panels', () => {
    const { container } = render(<Project {...project} />)
    openDetails(container)
    const tabs = screen.getAllByRole('tab')
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true')
    expect(tabs[0]).toHaveAttribute('tabindex', '0')
    expect(tabs[1]).toHaveAttribute('aria-selected', 'false')
    expect(tabs[1]).toHaveAttribute('tabindex', '-1')
    const panel = screen.getByRole('tabpanel')
    expect(tabs[0]).toHaveAttribute('aria-controls', panel.id)
    expect(panel).toHaveAttribute('aria-labelledby', tabs[0].id)
  })

  it('changes selection and focus with arrows, Home and End, including wrapping', () => {
    const { container } = render(<Project {...project} />)
    openDetails(container)
    const tabs = screen.getAllByRole('tab')
    tabs[0].focus()
    fireEvent.keyDown(tabs[0], { key: 'ArrowRight' })
    expect(tabs[1]).toHaveFocus()
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Web implementation')
    fireEvent.keyDown(tabs[1], { key: 'End' })
    expect(tabs[2]).toHaveFocus()
    fireEvent.keyDown(tabs[2], { key: 'Home' })
    expect(tabs[0]).toHaveFocus()
    fireEvent.keyDown(tabs[0], { key: 'ArrowLeft' })
    expect(tabs[2]).toHaveFocus()
    expect(screen.getByRole('tabpanel')).toHaveTextContent(
      'Backend implementation'
    )
  })

  it('renders every platform in the server fallback before hydration', () => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = renderToStaticMarkup(<Project {...project} />)
    expect(wrapper.querySelector('[role="tablist"]')).toHaveAttribute('hidden')
    const sections = wrapper.querySelectorAll('details section')
    expect(sections).toHaveLength(3)
    for (const section of Array.from(sections))
      expect(section).not.toHaveAttribute('hidden')
    expect(wrapper).toHaveTextContent('Mobile implementation')
    expect(wrapper).toHaveTextContent('Web implementation')
    expect(wrapper).toHaveTextContent('Backend implementation')
  })

  it('supports projects without public links or platform details', () => {
    const { container } = render(
      <Project {...project} links={[]} apps={[]} preview={undefined} />
    )
    expect(
      screen.getByRole('img', { name: 'Example product logo' })
    ).toBeInTheDocument()
    expect(screen.getByText('No public links available.')).toBeInTheDocument()
    expect(container.querySelector('details')).toBeNull()
  })
})
