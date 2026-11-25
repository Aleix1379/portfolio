import { test, expect } from '@playwright/test'

test.describe('Product and experience details', () => {
  test('lists the featured projects and opens the Skenium debate studio', async ({ page }) => {
    await page.goto('/#projects')
    const rows = page.locator('[data-project-row]')
    await expect(rows.locator(':scope > details > summary')).toHaveText([
      /Skenium/, /Race Tracker/, /WishFetch/, /Arcblink/
    ])
    const skenium = rows.filter({ has: page.locator('summary', { hasText: 'Skenium' }) })
    await expect(page.locator('astro-island[ssr]').filter({ has: skenium })).toHaveCount(0)
    await skenium.locator('summary').first().hover()
    await skenium.locator('summary').first().click()
    await expect(skenium.getByRole('link', { name: /Explore debates/ })).toHaveAttribute('href', 'https://skenium.com/')
    await expect(skenium.locator('[data-motif="dialogue"]:visible')).toHaveCount(1)
    await skenium.getByText('Technical details', { exact: true }).click()
    await expect(skenium.getByRole('tab', { name: 'Backend' })).toBeVisible()
  })

  test('reveals technical details and navigates platforms using the keyboard', async ({
    page
  }) => {
    await page.goto('/#projects')
    const row = page.locator('[data-project-row]').filter({ has: page.locator('summary', { hasText: 'Arcblink' }) })
    await row.locator(':scope > details > summary').click()
    const project = row.locator('article')
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
    const visible = section.locator('article:visible')
    await expect(visible.nth(0)).toContainText('TALKUAL')
    await expect(visible.nth(0)).toContainText('4 years and 5 months')
    await expect(visible.nth(0)).toContainText('Redsys')
    await expect(visible.nth(0)).not.toContainText('TypeScript')
    await expect(visible.nth(0).locator('ul').first().locator('li')).toHaveCount(3)
    await expect(visible.nth(0)).not.toContainText('Notion')
    await expect(visible.nth(1)).toContainText('Movetia')
    await expect(visible.nth(1)).toContainText('1 year and 8 months')
    await expect(visible.nth(2)).toContainText('Ubiquat Technologies')
    await expect(visible.nth(2)).toContainText('AngularJS')
    await expect(visible.nth(2)).toContainText('3 years and 2 months')
    const history = section.locator('details')
    await history.locator('summary').click()
    await expect(history).toHaveAttribute('open', '')
    await expect(section.locator('article:visible')).toHaveCount(6)
    await expect(history.locator('article').first()).toContainText('Coach4Pro')
    await expect(history.locator('summary')).toContainText(
      'Show less experience'
    )
    await history.locator('summary').click()
    await expect(history).not.toHaveAttribute('open')
    await expect(section.locator('article:visible')).toHaveCount(3)
  })

  test('serves the updated English CV from the existing download link', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('#projects a[href="/cv.pdf"]')).toHaveAttribute('download', /.*/)
    const response = await page.request.get('/cv.pdf')
    expect(response.ok()).toBe(true)
    expect(response.headers()['content-type']).toContain('application/pdf')
    expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-')
  })

  test('shows email actions and social links on mobile', async ({
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
    await expect(contact.getByRole('link', { name: 'LinkedIn' })).toBeVisible()
    await expect(contact.getByRole('link', { name: 'GitHub' })).toBeVisible()
    await expect(
      contact.getByRole('button', { name: 'Copy email', exact: true })
    ).toBeVisible()
    await expect(contact.locator('form')).toHaveCount(0)
  })

  test('keeps the dark theme despite saved light preferences', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('portfolio-theme', 'light')
      localStorage.setItem('data-theme', 'light')
    })
    await page.emulateMedia({ colorScheme: 'light' })
    await page.goto('/')
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
    await expect(page.locator('html')).toHaveCSS('color-scheme', 'dark')
    await expect(page.getByRole('button', { name: 'Dark theme' })).toHaveCount(0)
    await page.reload()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  })

})

test.describe('Content without JavaScript', () => {
  test.use({ javaScriptEnabled: false, reducedMotion: 'reduce' })

  test('exposes every platform when opening native technical details', async ({
    page
  }) => {
    await page.goto('/#projects')
    const row = page.locator('[data-project-row]').filter({ has: page.locator('summary', { hasText: 'Arcblink' }) })
    await row.locator(':scope > details > summary').click()
    const project = row.locator('article')
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
      page.locator('#projects a[href="/cv.pdf"]')
    ).toHaveAttribute('download', /.*/)
    await expect(
      page.locator('#contact a[href^="mailto:"]').first()
    ).toHaveAttribute('href', 'mailto:aleixmp1379@gmail.com')
    await expect(page.locator('#contact button')).toHaveCount(0)
  })
})
