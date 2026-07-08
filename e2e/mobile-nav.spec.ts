import { test, expect } from '@playwright/test'

test.describe('Mobile navigation drawer', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('opens drawer, navigates, and closes after link click', async ({
    page
  }) => {
    await page.goto('/')

    const menuButton = page.getByRole('button', {
      name: 'Open navigation menu'
    })
    await menuButton.click()

    const drawer = page.getByRole('dialog', { name: 'Navigation menu' })
    await expect(drawer).toBeVisible()
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true')

    await drawer.getByRole('link', { name: 'Experience' }).click()
    await expect(
      page.getByRole('heading', { name: 'Experience' })
    ).toBeVisible()
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  })

  test('closes on drawer close button click', async ({ page }) => {
    await page.goto('/')

    const menuButton = page.getByRole('button', {
      name: 'Open navigation menu'
    })
    await menuButton.click()

    const drawer = page.getByRole('dialog', { name: 'Navigation menu' })
    await expect(drawer).toBeVisible()

    await drawer.getByRole('button', { name: 'Close navigation menu' }).click()
    await expect(drawer).toBeHidden()
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  })

  test('closes on Escape', async ({ page }) => {
    await page.goto('/')

    const menuButton = page.getByRole('button', {
      name: 'Open navigation menu'
    })
    await menuButton.click()

    await expect(
      page.getByRole('dialog', { name: 'Navigation menu' })
    ).toBeVisible()

    await page.keyboard.press('Escape')

    await expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    await expect(menuButton).toBeFocused()
  })

  test('drawer links are not exposed when menu is closed', async ({ page }) => {
    await page.goto('/')

    const drawer = page.locator('#main-navigation-links')
    await expect(drawer).toHaveAttribute('aria-hidden', 'true')
    await expect(drawer).toHaveAttribute('inert', '')

    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')

    const focusedTag = await page.evaluate(
      () => document.activeElement?.textContent?.trim() ?? ''
    )

    expect(focusedTag).not.toBe('About')
    expect(focusedTag).not.toBe('Experience')
    expect(focusedTag).not.toBe('Projects')
  })

  test('drawer covers the viewport and keeps link styles consistent', async ({
    page
  }) => {
    await page.goto('/')

    await page.getByRole('button', { name: 'Open navigation menu' }).click()

    const drawer = page.getByRole('dialog', { name: 'Navigation menu' })
    await expect(drawer).toBeVisible()

    const viewport = page.viewportSize()
    const drawerBox = await drawer.boundingBox()

    expect(viewport).not.toBeNull()
    expect(drawerBox).not.toBeNull()
    expect(drawerBox!.height / viewport!.height).toBeGreaterThanOrEqual(0.95)

    await expect(
      drawer.getByRole('button', { name: 'Close navigation menu' })
    ).toBeVisible()

    const fontSizes = await drawer
      .getByRole('navigation', { name: 'Mobile navigation' })
      .getByRole('link')
      .evaluateAll(links =>
        links.map(link => window.getComputedStyle(link).fontSize)
      )

    expect(new Set(fontSizes).size).toBe(1)
  })

  test('drawer footer exposes availability, CV download, and contact links', async ({
    page
  }) => {
    await page.goto('/')

    await page.getByRole('button', { name: 'Open navigation menu' }).click()

    const drawer = page.getByRole('dialog', { name: 'Navigation menu' })
    await expect(drawer).toBeVisible()
    await expect(
      drawer.getByText('Open to product-focused frontend/full-stack roles.')
    ).toBeVisible()
    await expect(
      drawer.getByRole('button', { name: 'Download CV' })
    ).toBeVisible()
    await expect(drawer.getByRole('link', { name: 'Email' })).toBeVisible()
    await expect(drawer.getByRole('link', { name: 'LinkedIn' })).toBeVisible()
    await expect(drawer.getByRole('link', { name: 'GitHub' })).toBeVisible()
  })

  test('matches fullscreen mobile menu screenshot', async ({
    page
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== 'mobile-chrome',
      'visual regression runs on mobile-chrome only'
    )

    await page.goto('/')
    await page.getByRole('button', { name: 'Open navigation menu' }).click()

    const drawer = page.getByRole('dialog', { name: 'Navigation menu' })
    await expect(drawer).toBeVisible()

    await expect(drawer).toHaveScreenshot('mobile-menu-open.png', {
      maxDiffPixelRatio: 0.02
    })
  })
})

test.describe('Tablet navigation drawer', () => {
  test.use({ viewport: { width: 768, height: 1024 } })

  test('uses drawer navigation below desktop breakpoint', async ({ page }) => {
    await page.goto('/')

    const menuButton = page.getByRole('button', {
      name: 'Open navigation menu'
    })
    await expect(menuButton).toBeVisible()

    await menuButton.click()
    await expect(
      page.getByRole('dialog', { name: 'Navigation menu' })
    ).toBeVisible()
    await expect(page.getByRole('link', { name: 'Projects' })).toBeVisible()
  })
})
