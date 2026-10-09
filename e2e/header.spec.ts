import { test, expect, type Page } from '@playwright/test'

const viewports = [320, 390, 768, 1024, 1440, 1701]

async function openHeader(page: Page) {
  await page.goto('/')
  await expect(page.locator('body')).toHaveAttribute('data-theme', /dark|light/)
  await page.evaluate(() => document.fonts.ready)
}

async function expectProjectsBelowNavigation(page: Page) {
  await expect(page).toHaveURL(/#projects$/)
  await expect.poll(() => page.evaluate(() => {
    const heading = document.querySelector('#projects h2')!.getBoundingClientRect()
    const nav = document.getElementById('navContainer')!.getBoundingClientRect()
    return heading.top - nav.bottom
  })).toBeGreaterThanOrEqual(15)
  await expect.poll(() => page.evaluate(() =>
    document.querySelector('#projects h2')!.getBoundingClientRect().top
  )).toBeLessThan(200)
}

test.describe('Portfolio header', () => {
  test('opens projects through the native link', async ({ page }) => {
    await openHeader(page)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText("I'm Aleix.")
    await expect(page.getByRole('link', { name: 'View projects' })).toHaveAttribute('href', '#projects')
    await page.getByRole('link', { name: 'View projects' }).click()
    await expectProjectsBelowNavigation(page)
  })

  test('supports keyboard focus and activation', async ({ page, browserName }) => {
    await openHeader(page)
    const link = page.getByRole('link', { name: 'View projects' })
    // Option+Tab includes links in macOS WebKit's native keyboard navigation.
    await page.keyboard.press(browserName === 'webkit' ? 'Alt+Tab' : 'Tab')
    await expect(link).toBeFocused()
    await expect(link).toHaveCSS('outline-width', '2px')
    await expect(link).toHaveCSS('outline-offset', '4px')
    await page.keyboard.press('Enter')
    await expectProjectsBelowNavigation(page)
  })

  test('keeps text and keyboard focus legible after switching theme', async ({ page }) => {
    await openHeader(page)
    const link = page.getByRole('link', { name: 'View projects' })
    for (const theme of ['light', 'dark']) {
      await page.getByRole('button', { name: 'Toggle color theme' }).focus()
      await page.keyboard.press('Enter')
      await expect(page.locator('body')).toHaveAttribute('data-theme', theme)
      await link.focus()
      await expect(link).toBeFocused()
      await expect(link).toHaveCSS('outline-color', theme === 'dark' ? 'rgb(250, 250, 250)' : 'rgb(68, 68, 68)')
      await expect(page.locator('#header p').last()).toHaveCSS('color', theme === 'dark' ? 'rgb(174, 184, 178)' : 'rgb(82, 89, 81)')
    }
  })

  test('tracks the actual header bottom on scroll and resize', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await openHeader(page)
    const nav = page.locator('#navContainer')
    const bottom = await page.locator('#header').evaluate(element =>
      element.getBoundingClientRect().bottom + window.scrollY
    )
    await page.evaluate(top => window.scrollTo({ top, behavior: 'instant' }), bottom - 1)
    await expect(nav).toHaveClass(/navContainerShow/)
    await page.evaluate(top => window.scrollTo({ top, behavior: 'instant' }), bottom + 1)
    await expect(nav).toHaveClass(/navContainerHide/)

    await page.evaluate(top => window.scrollTo({ top, behavior: 'instant' }), bottom - 20)
    await expect(nav).toHaveClass(/navContainerShow/)
    await page.setViewportSize({ width: 390, height: 900 })
    await expect(nav).toHaveClass(/navContainerHide/)
    await page.setViewportSize({ width: 1440, height: 900 })
    await expect(nav).toHaveClass(/navContainerShow/)
  })

  test('respects reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await openHeader(page)
    await expect(page.locator('#header > div')).toHaveCSS('animation-name', 'none')
    await expect(page.locator('#header > div')).toHaveCSS('opacity', '1')
    await expect(page.locator('#header')).toHaveCSS('transition-duration', '0s')
    await expect(page.getByRole('link', { name: 'View projects' })).toHaveCSS('transition-duration', '0s')
    await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto')
  })

  for (const theme of ['dark', 'light']) {
    test(`centers the content without header overflow in ${theme} mode`, async ({ page }) => {
      await page.addInitScript(theme => localStorage.setItem('data-theme', theme), theme)
      for (const width of viewports) {
        await page.setViewportSize({ width, height: 1000 })
        await openHeader(page)
        await expect(page.locator('body')).toHaveAttribute('data-theme', theme)
        const layout = await page.locator('#header').evaluate(header => {
          const bounds = header.getBoundingClientRect()
          const content = Array.from(header.querySelectorAll('h1, p, a')).map(element => {
            const rect = element.getBoundingClientRect()
            return { center: rect.left + rect.width / 2, left: rect.left, right: rect.right }
          })
          return { center: bounds.left + bounds.width / 2, width: bounds.width, height: bounds.height,
            viewportWidth: document.documentElement.clientWidth,
            minimumHeight: matchMedia('(min-width: 1024px)').matches ? 400 : matchMedia('(min-width: 768px)').matches ? 380 : 360,
            scrollWidth: header.scrollWidth, content }
        })
        expect(layout.width).toBe(layout.viewportWidth)
        expect(layout.scrollWidth).toBeLessThanOrEqual(layout.width)
        expect(layout.height).toBeGreaterThanOrEqual(layout.minimumHeight)
        for (const element of layout.content) {
          expect(Math.abs(element.center - layout.center)).toBeLessThan(1)
          expect(element.left).toBeGreaterThanOrEqual(0)
          expect(element.right).toBeLessThanOrEqual(layout.width)
        }
      }
    })
  }

  test('reflows at 320px with text enlarged to 200 percent', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 1000 })
    await openHeader(page)
    await page.evaluate(() => { document.documentElement.style.fontSize = '200%' })
    await expect(page.getByRole('link', { name: 'View projects' })).toBeVisible()
    const layout = await page.locator('#header').evaluate(header => ({
      width: header.clientWidth, scrollWidth: header.scrollWidth, height: header.getBoundingClientRect().height
    }))
    expect(layout.scrollWidth).toBeLessThanOrEqual(layout.width)
    expect(layout.height).toBeGreaterThan(360)
    await page.getByRole('link', { name: 'View projects' }).click()
    await expect(page).toHaveURL(/#projects$/)
  })

  test('keeps the project link operable at 200 percent CSS zoom', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 1000 })
    await openHeader(page)
    await page.evaluate(() => { document.body.style.zoom = '2' })
    const layout = await page.locator('#header').evaluate(header => ({
      width: header.clientWidth, scrollWidth: header.scrollWidth
    }))
    expect(layout.scrollWidth).toBeLessThanOrEqual(layout.width)
    await page.getByRole('link', { name: 'View projects' }).click()
    await expect(page).toHaveURL(/#projects$/)
  })
})

test.describe('Server-rendered header', () => {
  test.use({ javaScriptEnabled: false, reducedMotion: 'reduce' })

  test('renders legibly and navigates without JavaScript', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText("I'm Aleix.")
    await expect(page.locator('#header')).toHaveCSS('background-color', 'rgb(0, 0, 0)')
    await expect(page.locator('#header')).toHaveCSS('color', 'rgb(250, 250, 250)')
    await page.getByRole('link', { name: 'View projects' }).click()
    await expectProjectsBelowNavigation(page)
  })
})
