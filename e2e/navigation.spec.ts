import { test, expect } from '@playwright/test'

test.describe('Portfolio Website Navigation', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto('/')

    // Check if the page title is correct
    await expect(page).toHaveTitle(/Aleix/)
  })

  test('should navigate to About section', async ({ page }) => {
    await page.goto('/')

    // Find and click the About link in the navigation menu
    await page.getByRole('link', { name: 'About' }).click()

    // Check if the About section is visible
    await expect(page.getByRole('heading', { name: 'About me' })).toBeVisible()
  })

  test('should have a Download CV button in About section', async ({
    page
  }) => {
    await page.goto('/')

    // Navigate to About section if needed
    if (!(await page.getByText('About me').isVisible())) {
      await page.getByRole('link', { name: 'About' }).click()
    }

    // Wait for the About section to be fully visible
    await page.waitForSelector('#about')

    // Check if the Download CV button exists in About
    await expect(
      page.locator('#about').getByRole('button', { name: 'Download CV' })
    ).toBeVisible()
  })

  test('should display years of experience in About section', async ({
    page
  }) => {
    await page.goto('/')

    // Navigate to About section if needed
    if (!(await page.getByText('About me').isVisible())) {
      await page.getByRole('link', { name: 'About' }).click()
    }

    // Wait for the About section to be fully visible
    await page.waitForSelector('#about')

    // Check if the years of experience text is visible
    await expect(page.getByText(/Vue\/Nuxt applications/i)).toBeVisible()
  })

  test('should mark the active desktop nav link with aria-current', async ({
    page
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto('/')

    const aboutLink = page.getByRole('link', { name: 'About' })
    const experienceLink = page.getByRole('link', { name: 'Experience' })

    await expect(aboutLink).toHaveAttribute('aria-current', 'location')
    await expect(experienceLink).not.toHaveAttribute('aria-current', 'location')

    await experienceLink.click()
    await expect(experienceLink).toHaveAttribute('aria-current', 'location')
    await expect(aboutLink).not.toHaveAttribute('aria-current', 'location')
  })
})
