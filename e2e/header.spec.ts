import { test, expect, type Page } from '@playwright/test'

async function openIndex(page: Page) {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Selected projects')
  await page.evaluate(() => document.fonts.ready)
}

async function expectNoOverflow(page: Page) {
  await expect.poll(() => page.evaluate(() =>
    document.documentElement.scrollWidth - document.documentElement.clientWidth
  )).toBeLessThanOrEqual(1)
}

test('keeps the compact navigation visible while reading experience', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await openIndex(page)
  const nav = page.getByRole('navigation')
  await nav.getByRole('link', { name: 'Experience' }).click()
  await expect(nav.getByRole('link', { name: 'Experience' })).toHaveAttribute('aria-current', 'location')
  await expect.poll(async () => Math.abs((await nav.boundingBox())!.y)).toBeLessThanOrEqual(1)
  await nav.getByRole('link', { name: 'Projects' }).click()
  await expect(page).toHaveURL(/#projects$/)
  await expect(page.getByRole('heading', { level: 1 })).toBeInViewport()
})

test('reveals the focused poster with enough space beside its category', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await openIndex(page)
  const row = page.locator('[data-project-row]').filter({ has: page.locator('summary', { hasText: 'Arcblink' }) })
  const trigger = row.locator(':scope > details > summary')
  await trigger.focus()
  await expect(row).toHaveAttribute('data-active', 'true')
  await trigger.hover()
  const poster = row.locator(':scope > div [data-motif]')
  await expect(poster).toBeVisible()
  await expect.poll(async () => {
    const category = await trigger.locator(':scope > span').last().boundingBox()
    const cover = await poster.boundingBox()
    return cover!.x - category!.x - category!.width
  }).toBeGreaterThanOrEqual(24)
  await page.keyboard.press('Enter')
  await expect(row.getByRole('link', { name: /Play game/ })).toBeVisible()
})

test('places the mobile technical disclosure below the cover and keeps the stores together', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 })
  await openIndex(page)
  const row = page.locator('[data-project-row]').filter({ has: page.locator('summary', { hasText: 'Arcblink' }) })
  await row.locator('summary').first().click()
  const cover = row.locator('article [data-motif]')
  const details = row.getByText('Technical details', { exact: true })
  const stores = row.locator('article a').filter({ hasText: /Android|iOS/ })
  await expect(stores).toHaveCount(2)
  await expect.poll(async () => {
    const image = await cover.boundingBox()
    const summary = await details.boundingBox()
    return summary!.y - image!.y - image!.height
  }).toBeGreaterThanOrEqual(0)
  expect((await details.boundingBox())!.height).toBeGreaterThanOrEqual(44)
  const storeTops = await stores.evaluateAll(links => links.map(link => link.getBoundingClientRect().top))
  expect(Math.abs(storeTops[0] - storeTops[1])).toBeLessThan(1)
  await expectNoOverflow(page)
})

test('reflows at mobile, tablet and desktop widths', async ({ page }) => {
  await openIndex(page)
  for (const width of [320, 390, 768, 1024, 1440, 1701]) {
    await page.setViewportSize({ width, height: 900 })
    await expectNoOverflow(page)
  }
})

test('keeps the mobile menu reachable with enlarged text and zoom', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 1000 })
  await openIndex(page)
  await page.evaluate(() => { document.documentElement.style.fontSize = '200%' })
  await expectNoOverflow(page)
  await page.evaluate(() => {
    document.documentElement.style.fontSize = ''
    document.body.style.zoom = '2'
  })
  await expectNoOverflow(page)
  const menu = page.locator('nav details')
  await menu.locator('summary').click()
  const link = menu.getByRole('link', { name: 'Projects' })
  await expect(link).toBeInViewport()
  await link.click()
  await expect(page).toHaveURL(/#projects$/)
})

test('respects reduced motion for the project entrance and hover', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await openIndex(page)
  await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto')
  const row = page.locator('[data-project-row]').filter({ has: page.locator('summary', { hasText: 'Arcblink' }) })
  await row.locator('summary').first().hover()
  await expect(row.locator('summary').first().locator('span').first()).toHaveCSS('animation-name', 'none')
  await expect(row.locator(':scope > div')).toHaveCSS('transition-duration', '0s')
})

test.describe('Server-rendered index', () => {
  test.use({ javaScriptEnabled: false, reducedMotion: 'reduce' })
  test('exposes the index, about copy and native contact link', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Selected projects')
    await expect(page.locator('#about > div:last-child p')).toHaveCount(4)
    await page.locator('#projects a[href="#contact"]').click()
    await expect(page).toHaveURL(/#contact$/)
  })
})
