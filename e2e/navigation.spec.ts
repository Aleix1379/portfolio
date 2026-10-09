import { test, expect } from '@playwright/test'

test.describe('Portfolio navigation', () => {
  test('links directly to each section and exposes a native CV download', async ({
    page
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')
    await expect(page).toHaveTitle(/Aleix/)
    for (const id of ['projects', 'experience', 'about', 'contact']) {
      await page.locator(`#navContainer a[href="#${id}"]:visible`).click()
      await expect(page).toHaveURL(new RegExp(`#${id}$`))
      await expect(page.locator(`#${id} h2`).first()).toBeVisible()
    }
    const cv = page.locator('#navContainer a[href="/cv.pdf"]:visible')
    await expect(cv).toHaveAttribute('download', /.*/)
    const response = await page.request.get('/cv.pdf')
    expect(response.ok()).toBe(true)
    expect(response.headers()['content-type']).toContain('application/pdf')
  })

  test('supports a direct hash and browser back navigation', async ({
    page
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/#experience')
    await expect(page.locator('#experience h2')).toBeVisible()
    await page.locator('#navContainer a[href="#projects"]:visible').click()
    await expect(page).toHaveURL(/#projects$/)
    await page.goBack()
    await expect(page).toHaveURL(/#experience$/)
  })

  test('keeps a closed mobile menu out of keyboard navigation', async ({
    page
  }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    const menu = page.locator('#navContainer details')
    const summary = menu.locator('summary')
    await expect(summary).toHaveText('Menu')
    await expect(menu).not.toHaveAttribute('open')
    await expect(menu.locator('a[href="#projects"]')).not.toBeVisible()
    await summary.focus()
    await page.keyboard.press('Tab')
    expect(
      await menu.evaluate(element => element.contains(document.activeElement))
    ).toBe(false)
  })

  test('closes the mobile menu with Escape and returns focus to its summary', async ({
    page
  }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    const menu = page.locator('#navContainer details')
    await menu.locator('summary').click()
    await expect(menu).toHaveAttribute('open', '')
    await menu.locator('a[href="#about"]').focus()
    await page.keyboard.press('Escape')
    await expect(menu).not.toHaveAttribute('open')
    await expect(menu.locator('summary')).toBeFocused()
  })

  test('closes the mobile menu after navigation and focuses the destination', async ({
    page
  }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    const menu = page.locator('#navContainer details')
    await menu.locator('summary').click()
    await menu.locator('a[href="#projects"]').click()
    await expect(page).toHaveURL(/#projects$/)
    await expect(menu).not.toHaveAttribute('open')
    await expect(page.locator('#projects')).toBeFocused()
  })

  test('switches theme even when persistent storage is blocked', async ({
    page
  }) => {
    await page.addInitScript(() => {
      Storage.prototype.getItem = () => {
        throw new DOMException('Blocked', 'SecurityError')
      }
      Storage.prototype.setItem = () => {
        throw new DOMException('Blocked', 'SecurityError')
      }
    })
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    await page.goto('/')
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
    await page.getByRole('button', { name: 'Dark theme', exact: true }).click()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
    expect(errors).toEqual([])
  })

  test('downloads the CV from the mobile menu and restores visible focus', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    const menu = page.locator('#navContainer details')
    await menu.locator('summary').click()
    const downloadEvent = page.waitForEvent('download')
    await menu.locator('a[href="/cv.pdf"]').click()
    const download = await downloadEvent
    expect(download.suggestedFilename()).toBe('cv.pdf')
    expect(await download.failure()).toBeNull()
    await expect(menu).not.toHaveAttribute('open')
    await expect(menu.locator('summary')).toBeFocused()
  })
})

test.describe('Native navigation without JavaScript', () => {
  test.use({ javaScriptEnabled: false, reducedMotion: 'reduce' })

  test('opens the mobile menu and follows its section links', async ({
    page
  }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    const menu = page.locator('#navContainer details')
    await menu.locator('summary').click()
    await menu.locator('a[href="#contact"]').click()
    await expect(page).toHaveURL(/#contact$/)
    await expect(
      page.locator('#contact a[href^="mailto:"]').first()
    ).toBeVisible()
  })
})
