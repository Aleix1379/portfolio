import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import Nav from '../../components/Nav'

jest.mock('../../hooks/useTheme', () => ({
  __esModule: true,
  default: () => ['dark', jest.fn()]
}))

beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: jest.fn(() => ({
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    }))
  })
})

function renderNavigation() {
  return render(
    <>
      <Nav />
      <section id="projects" tabIndex={-1}>
        Projects destination
      </section>
      <section id="experience" tabIndex={-1}>
        Experience destination
      </section>
      <section id="about" tabIndex={-1}>
        About destination
      </section>
      <section id="contact" tabIndex={-1}>
        Contact destination
      </section>
    </>
  )
}

describe('Nav', () => {
  it('provides section anchors and a native CV download', () => {
    const { container } = renderNavigation()
    const nav = container.querySelector('nav')!
    for (const id of ['projects', 'experience', 'about', 'contact']) {
      expect(nav.querySelector(`a[href="#${id}"]`)).not.toBeNull()
    }
    expect(nav.querySelector('a[href="/cv.pdf"]')).toHaveAttribute('download')
    const menu = nav.querySelector('details')!
    expect(menu).not.toHaveAttribute('open')
    expect(menu.querySelector('summary')).toHaveTextContent('Menu')
  })

  it('closes an open menu on Escape and focuses the summary', () => {
    const { container } = renderNavigation()
    const menu = container.querySelector('details')!
    const summary = menu.querySelector('summary')!
    menu.open = true
    const link = menu.querySelector<HTMLAnchorElement>('a[href="#about"]')!
    link.focus()
    fireEvent.keyDown(link, { key: 'Escape' })
    expect(menu).not.toHaveAttribute('open')
    expect(summary).toHaveFocus()
  })

  it('closes an open menu after a section link is selected and focuses that section', async () => {
    const { container } = renderNavigation()
    const menu = container.querySelector('details')!
    menu.open = true
    fireEvent.click(menu.querySelector('a[href="#projects"]')!)
    expect(menu).not.toHaveAttribute('open')
    await waitFor(() =>
      expect(container.querySelector('#projects')).toHaveFocus()
    )
  })

  it('returns focus to the summary after a mobile CV download', () => {
    const { container } = renderNavigation()
    const menu = container.querySelector('details')!
    menu.open = true
    const cv = menu.querySelector<HTMLAnchorElement>('a[href="/cv.pdf"]')!
    // jsdom does not implement native downloads; browser tests cover the PDF.
    cv.addEventListener('click', event => event.preventDefault())
    cv.focus()
    fireEvent.click(cv)
    expect(menu).not.toHaveAttribute('open')
    expect(menu.querySelector('summary')).toHaveFocus()
  })
})
