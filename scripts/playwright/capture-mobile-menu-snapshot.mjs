import { chromium, devices } from '@playwright/test'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '../..')
const snapshotDir = path.join(rootDir, 'e2e/mobile-nav.spec.ts-snapshots')
const snapshotPath = path.join(
  snapshotDir,
  'mobile-menu-open-mobile-chrome-linux.png'
)
const baseUrl = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:4321'

const browser = await chromium.launch()
const context = await browser.newContext({
  ...devices['Pixel 5']
})
const page = await context.newPage()

await page.goto(baseUrl)
await page.getByRole('button', { name: 'Open navigation menu' }).click()

const drawer = page.getByRole('dialog', { name: 'Navigation menu' })
await drawer.waitFor({ state: 'visible' })

const viewport = page.viewportSize()
const drawerBox = await drawer.boundingBox()

if (!viewport || !drawerBox) {
  throw new Error('Unable to measure drawer layout')
}

if (drawerBox.height / viewport.height < 0.95) {
  throw new Error(
    `Drawer height ratio too small: ${drawerBox.height / viewport.height}`
  )
}

await mkdir(snapshotDir, { recursive: true })
await drawer.screenshot({ path: snapshotPath })

console.log(`Saved snapshot to ${snapshotPath}`)
await browser.close()
