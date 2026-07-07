import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'

const url = process.argv[2] ?? 'http://127.0.0.1:4321/'
const viewportArg = process.argv[3] ?? 'desktop'
const viewports = {
  desktop: { width: 1400, height: 900 },
  mobile: { width: 390, height: 844 },
  tablet: { width: 768, height: 1024 }
}
const viewport = viewports[viewportArg] ?? viewports.desktop

await mkdir('output/playwright', { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({ viewport })
await page.goto(url, { waitUntil: 'networkidle' })

const measure = async (label) => {
  return page.evaluate((measureLabel) => {
    const nav = document.querySelector('nav[aria-label="Main navigation"]')
    const navRect = nav?.getBoundingClientRect()
    const navBottom = navRect ? navRect.bottom : null

    const htmlStyles = getComputedStyle(document.documentElement)
    const scrollPaddingTop = htmlStyles.scrollPaddingTop

  const sections = ['about', 'experience', 'projects'].map((id) => {
    const section = document.getElementById(id)
    const eyebrow = section?.querySelector('[class*="eyebrow"]')
    const header = section?.querySelector('[class*="sectionHeader"]')
    const target = eyebrow ?? header ?? section
    const targetRect = target?.getBoundingClientRect()
    const sectionStyles = section ? getComputedStyle(section) : null

    return {
      id,
      scrollY: window.scrollY,
      scrollPaddingTop,
      scrollMarginTop: sectionStyles?.scrollMarginTop ?? null,
      navBottom,
      targetTop: targetRect?.top ?? null,
      gapBelowNav:
        targetRect && navBottom !== null ? targetRect.top - navBottom : null,
      sectionTop: section?.getBoundingClientRect().top ?? null
    }
  })

    return {
      label: measureLabel,
      scrollY: window.scrollY,
      scrollPaddingTop,
      navBottom,
      sections
    }
  }, label)
}

const before = await measure('initial-top')
const results = [before]

for (const id of ['about', 'experience', 'projects']) {
  const navLink = page.locator(`nav a[href="#${id}"], #main-navigation-links a[href="#${id}"]`).first()

  if (viewportArg !== 'desktop') {
    const menuButton = page.locator('button[aria-controls="main-navigation-links"]')
    if (await menuButton.isVisible()) {
      await menuButton.click()
      await page.waitForTimeout(300)
    }
  }

  await navLink.click()
  await page.waitForTimeout(700)
  results.push(await measure(`clicked-${id}`))

  if (viewportArg !== 'desktop') {
    const menuButton = page.locator('button[aria-controls="main-navigation-links"]')
    if (await menuButton.getAttribute('aria-expanded') === 'true') {
      await menuButton.click()
      await page.waitForTimeout(200)
    }
  }
}

await page.screenshot({
  path: `output/playwright/scroll-nav-${viewportArg}-experience.png`,
  fullPage: false
})

await writeFile(
  'output/playwright/scroll-nav-measurements.json',
  JSON.stringify(results, null, 2)
)

console.log(JSON.stringify(results, null, 2))
await browser.close()
