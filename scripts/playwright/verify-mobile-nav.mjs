import { chromium, devices, expect } from '@playwright/test'

const baseUrl = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:4321'

const browser = await chromium.launch()
const context = await browser.newContext({
  ...devices['Pixel 5']
})
const page = await context.newPage()

const menuButton = () =>
  page.getByRole('button', { name: 'Open navigation menu' })
const drawer = () => page.getByRole('dialog', { name: 'Navigation menu' })

await page.goto(baseUrl)

await menuButton().click()
await expect(drawer()).toBeVisible()
await expect(menuButton()).toHaveAttribute('aria-expanded', 'true')

const viewport = page.viewportSize()
const drawerBox = await drawer().boundingBox()
expect(viewport).not.toBeNull()
expect(drawerBox).not.toBeNull()
expect(drawerBox.height / viewport.height).toBeGreaterThanOrEqual(0.95)

await expect(
  drawer().getByRole('button', { name: 'Close navigation menu' })
).toBeVisible()

const fontSizes = await drawer()
  .getByRole('link')
  .evaluateAll(links =>
    links.map(link => window.getComputedStyle(link).fontSize)
  )
expect(new Set(fontSizes).size).toBe(1)

await drawer().getByRole('link', { name: 'Experience' }).click()
await expect(page.getByRole('heading', { name: 'Experience' })).toBeVisible()
await expect(menuButton()).toHaveAttribute('aria-expanded', 'false')

await menuButton().click()
await expect(drawer()).toBeVisible()
await drawer().getByRole('button', { name: 'Close navigation menu' }).click()
await expect(drawer()).toBeHidden()
await expect(menuButton()).toHaveAttribute('aria-expanded', 'false')

await menuButton().click()
await expect(drawer()).toBeVisible()
await page.keyboard.press('Escape')
await expect(menuButton()).toHaveAttribute('aria-expanded', 'false')
await expect(menuButton()).toBeFocused()

await expect(page.locator('#main-navigation-links')).toHaveAttribute(
  'aria-hidden',
  'true'
)
await expect(page.locator('#main-navigation-links')).toHaveAttribute(
  'inert',
  ''
)

console.log('All mobile navigation checks passed.')
await browser.close()
