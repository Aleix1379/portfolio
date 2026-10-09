import React from 'react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import ContactSection from '../../sections/ContactSection'

const { renderToStaticMarkup } =
  require('react-dom/server.node') as typeof import('react-dom/server')
const email = 'aleixmp1379@gmail.com'
const originalClipboard = Object.getOwnPropertyDescriptor(
  navigator,
  'clipboard'
)

function mockClipboard(writeText?: jest.Mock) {
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: writeText ? { writeText } : undefined
  })
}

afterEach(() => {
  if (originalClipboard)
    Object.defineProperty(navigator, 'clipboard', originalClipboard)
  else Reflect.deleteProperty(navigator, 'clipboard')
})

describe('ContactSection', () => {
  it('offers email and social links in the server-rendered fallback', () => {
    const html = renderToStaticMarkup(<ContactSection />)
    expect(html).toContain(`href="mailto:${email}"`)
    expect(html).toContain('https://www.linkedin.com/in/aleixmp/')
    expect(html).toContain('https://github.com/Aleix1379')
    expect(html).not.toContain('Copy email')
    expect(html).not.toContain('<form')
  })

  it('copies the email and announces success', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined)
    mockClipboard(writeText)
    render(<ContactSection />)
    fireEvent.click(screen.getByRole('button', { name: 'Copy email' }))
    await waitFor(() =>
      expect(screen.getByRole('status')).toHaveTextContent('Email copied')
    )
    expect(writeText).toHaveBeenCalledWith(email)
    expect(screen.getByRole('button', { name: 'Copy email' })).toBeEnabled()
  })

  it('disables repeated copy requests while the clipboard operation is pending', async () => {
    let resolveCopy!: () => void
    const writeText = jest.fn(
      () =>
        new Promise<void>(resolve => {
          resolveCopy = resolve
        })
    )
    mockClipboard(writeText)
    render(<ContactSection />)
    fireEvent.click(screen.getByRole('button', { name: 'Copy email' }))
    expect(screen.getByRole('button', { name: 'Copying…' })).toBeDisabled()
    expect(screen.getByRole('status')).toHaveTextContent('Copying email…')
    await act(async () => resolveCopy())
    expect(screen.getByRole('button', { name: 'Copy email' })).toBeEnabled()
    expect(writeText).toHaveBeenCalledTimes(1)
  })

  it.each(['unavailable', 'denied'])(
    'keeps the address usable when clipboard access is %s',
    async reason => {
      mockClipboard(
        reason === 'denied'
          ? jest.fn().mockRejectedValue(new Error('Permission denied'))
          : undefined
      )
      render(<ContactSection />)
      fireEvent.click(screen.getByRole('button', { name: 'Copy email' }))
      await waitFor(() =>
        expect(screen.getByRole('status')).toHaveTextContent(
          "Couldn't copy. Select and copy the email address."
        )
      )
      expect(screen.getByRole('link', { name: email })).toHaveAttribute(
        'href',
        `mailto:${email}`
      )
      expect(screen.getByRole('button', { name: 'Copy email' })).toBeEnabled()
    }
  )
})
