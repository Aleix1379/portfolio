import { test, expect } from '@playwright/test'

test.describe('Product and experience details', () => {
  test('loads each featured product preview with a descriptive alternative', async ({
    page
  }) => {
    await page.goto('/#projects')
    const images = page.locator('#projects article > img')
    await expect(images).toHaveCount(3)
    for (const image of await images.all()) {
      await image.scrollIntoViewIfNeeded()
      await expect(image).toHaveAttribute('alt', /\S.+/)
      await expect
        .poll(() =>
          image.evaluate(element => (element as HTMLImageElement).naturalWidth)
        )
        .toBeGreaterThan(0)
    }
  })

  test('reveals technical details and navigates platforms using the keyboard', async ({
    page
  }) => {
    await page.goto('/#projects')
    const project = page.locator('#projects article').first()
    const details = project.locator('details')
    await expect(details).not.toHaveAttribute('open')
    await details.locator('summary').click()
    const mobile = project.getByRole('tab', { name: 'Mobile', exact: true })
    const web = project.getByRole('tab', { name: 'Web', exact: true })
    const backend = project.getByRole('tab', { name: 'Backend', exact: true })
    await mobile.focus()
    await page.keyboard.press('ArrowRight')
    await expect(web).toBeFocused()
    await expect(web).toHaveAttribute('aria-selected', 'true')
    await expect(project.getByRole('tabpanel')).toContainText('Browser game')
    await page.keyboard.press('End')
    await expect(backend).toBeFocused()
    await expect(backend).toHaveAttribute('aria-selected', 'true')
    await page.keyboard.press('Home')
    await expect(mobile).toBeFocused()
    await page.keyboard.press('ArrowLeft')
    await expect(backend).toBeFocused()
    await details.locator('summary').click()
    await expect(details).not.toHaveAttribute('open')
    await expect(backend).not.toBeVisible()
  })

  test('expands and collapses older experience', async ({ page }) => {
    await page.goto('/#experience')
    const section = page.locator('#experience')
    await expect(section.locator('article:visible')).toHaveCount(3)
    const history = section.locator('details')
    await history.locator('summary').click()
    await expect(history).toHaveAttribute('open', '')
    await expect(section.locator('article:visible')).toHaveCount(6)
    await expect(history.locator('summary')).toContainText(
      'Show less experience'
    )
    await history.locator('summary').click()
    await expect(history).not.toHaveAttribute('open')
    await expect(section.locator('article:visible')).toHaveCount(3)
  })

  test('shows native email actions before the contact illustration on mobile', async ({
    page
  }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/#contact')
    const contact = page.locator('#contact')
    const email = contact.getByRole('link', {
      name: 'aleixmp1379@gmail.com',
      exact: true
    })
    await expect(email).toHaveAttribute('href', 'mailto:aleixmp1379@gmail.com')
    // Read both rectangles in one frame: native hash scrolling can still be moving.
    const position = await contact.evaluate(section => {
      const email = section
        .querySelector('a[href^="mailto:"]')!
        .getBoundingClientRect()
      const image = section
        .querySelector('img:not([aria-hidden="true"])')!
        .getBoundingClientRect()
      return { emailBottom: email.bottom, imageTop: image.top }
    })
    expect(position.emailBottom).toBeLessThanOrEqual(position.imageTop)
    await expect(
      contact.getByRole('button', { name: 'Copy email', exact: true })
    ).toBeVisible()
    await expect(contact.locator('form')).toHaveCount(0)
  })

  test('rejects an invalid persisted theme', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('portfolio-theme', 'invalid-theme')
      localStorage.removeItem('data-theme')
    })
    await page.goto('/')
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  })

  test('keeps an existing saved light theme when migrating its storage key', async ({
    page
  }) => {
    await page.addInitScript(() => {
      localStorage.removeItem('portfolio-theme')
      localStorage.setItem('data-theme', 'light')
    })
    await page.goto('/')
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
    await expect(
      page.getByRole('button', { name: 'Dark theme', exact: true })
    ).toHaveAttribute('aria-pressed', 'false')
    await page.getByRole('button', { name: 'Dark theme', exact: true }).click()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
    expect(
      await page.evaluate(() => localStorage.getItem('portfolio-theme'))
    ).toBe('dark')
  })
})

test.describe('Content without JavaScript', () => {
  test.use({ javaScriptEnabled: false, reducedMotion: 'reduce' })

  test('exposes every platform when opening native technical details', async ({
    page
  }) => {
    await page.goto('/#projects')
    const project = page.locator('#projects article').first()
    await project.locator('summary').click()
    await expect(
      project.getByRole('heading', { name: 'Arcblink Mobile' })
    ).toBeVisible()
    await expect(
      project.getByRole('heading', { name: 'Arcblink Web' })
    ).toBeVisible()
    await expect(
      project.getByRole('heading', { name: 'Arcblink API' })
    ).toBeVisible()
    await expect(project.getByRole('tablist')).toHaveCount(0)
  })

  test('expands older jobs and offers email and CV links without JavaScript', async ({
    page
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/#experience')
    await page.locator('#experience details summary').click()
    await expect(page.locator('#experience article:visible')).toHaveCount(6)
    await expect(
      page.locator('#navContainer a[href="/cv.pdf"]:visible')
    ).toHaveAttribute('download', /.*/)
    await expect(
      page.locator('#contact a[href^="mailto:"]').first()
    ).toHaveAttribute('href', 'mailto:aleixmp1379@gmail.com')
    await expect(page.locator('#contact button')).toHaveCount(0)
  })
})
