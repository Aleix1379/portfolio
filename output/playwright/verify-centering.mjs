import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

await mkdir('output/playwright', { recursive: true })

const url = process.argv[2] ?? 'http://127.0.0.1:4329/'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1400, height: 1200 } })
await page.goto(url, { waitUntil: 'networkidle' })

const measureEl = (el) => {
  const box = el.getBoundingClientRect()
  const track = el.querySelector(':scope > [class*="badgeTrack"]')
  const content = track
    ? track.querySelector(':scope > [class*="badgeIcon"]')
      ? track
      : track.querySelector(':scope > :last-child') || track
    : el.querySelector(':scope > [class*="badgeLabel"]') || el
  const contentRect = content.getBoundingClientRect()

  const borderTop = parseFloat(getComputedStyle(el).borderTopWidth) || 0
  const borderBottom = parseFloat(getComputedStyle(el).borderBottomWidth) || 0
  const innerTop = box.top + borderTop
  const innerBottom = box.bottom - borderBottom
  const textTopGap = contentRect.top - innerTop
  const textBottomGap = innerBottom - contentRect.bottom
  const textSkew = textBottomGap - textTopGap
  const innerCenter = innerTop + (innerBottom - innerTop) / 2
  const textCenter = contentRect.top + contentRect.height / 2
  const textOffset = textCenter - innerCenter

  let iconTextDelta = null
  const icon =
    track?.querySelector(':scope > span:first-child svg')
      ? track.querySelector(':scope > span:first-child')
      : null
  if (icon) {
    const iconBox = icon.getBoundingClientRect()
    const iconCenter = iconBox.top + iconBox.height / 2
    iconTextDelta = Math.abs(iconCenter - textCenter)
  }

  return {
    text: (el.textContent || '').trim().slice(0, 36),
    height: Math.round(box.height * 100) / 100,
    textSkew: Math.round(textSkew * 100) / 100,
    textOffset: Math.round(textOffset * 100) / 100,
    iconTextDelta:
      iconTextDelta === null ? null : Math.round(iconTextDelta * 100) / 100
  }
}

const results = await page.evaluate((measureSource) => {
  const measure = new Function('el', `return (${measureSource})(el)`)

  const targets = []

  const kicker = document.querySelector('#header [class*="kicker"]')
  if (kicker) targets.push({ group: 'kicker', el: kicker })

  const note = document.querySelector('#header [class*="note"]')
  if (note) targets.push({ group: 'availability', el: note })

  document
    .querySelectorAll('[aria-label="Portfolio highlights"] [class*="chip"]')
    .forEach((el) => targets.push({ group: 'stat-chip', el }))

  document
    .querySelectorAll('#header [class*="primaryAction"]')
    .forEach((el) => targets.push({ group: 'hero-btn', el }))

  document
    .querySelectorAll('footer a[class*="linkAction"], footer a[class*="link"]')
    .forEach((el) => targets.push({ group: 'footer-link', el }))

  document
    .querySelectorAll('[class*="tabItem"]')
    .forEach((el, i) => {
      if (i < 4) targets.push({ group: 'tab', el })
    })

  document
    .querySelectorAll('[class*="technologies"] a[class*="link"]')
    .forEach((el, i) => {
      if (i < 6) targets.push({ group: 'tech-chip', el })
    })

  document
    .querySelectorAll('[class*="linkPrimary"]')
    .forEach((el, i) => {
      if (i < 3) targets.push({ group: 'store-btn', el })
    })

  return targets.map(({ group, el }) => ({ group, ...measure(el) }))
}, measureEl.toString())

const summary = {}
for (const row of results) {
  summary[row.group] ??= []
  summary[row.group].push(row)
}

console.log('=== Optical centering (|textSkew| ≤ 0.75px, icon↔text ≤ 0.75px) ===\n')
for (const [group, rows] of Object.entries(summary)) {
  const maxSkew = Math.max(...rows.map((r) => Math.abs(r.textSkew)))
  const iconRows = rows.filter((r) => r.iconTextDelta !== null)
  const maxIconText = iconRows.length
    ? Math.max(...iconRows.map((r) => r.iconTextDelta))
    : 0
  console.log(
    `## ${group} (max|skew|=${maxSkew.toFixed(2)}, max|icon↔text|=${maxIconText.toFixed(2)})`
  )
  for (const row of rows) {
    const iconPart =
      row.iconTextDelta === null ? '' : `  icon↔text=${row.iconTextDelta}`
    console.log(
      `  ${row.text.padEnd(36)} h=${row.height}  skew=${row.textSkew}${iconPart}`
    )
  }
  console.log()
}

await page.evaluate(() => {
  const footer = document.querySelector('footer')
  if (footer) footer.scrollIntoView({ block: 'center' })
})
await page.waitForTimeout(300)

await page.screenshot({
  path: 'output/playwright/chips-alignment-desktop.png',
  clip: { x: 0, y: 520, width: 1400, height: 420 }
})

await page.setViewportSize({ width: 390, height: 844 })
await page.goto(url, { waitUntil: 'networkidle' })
await page.evaluate(() => {
  const footer = document.querySelector('footer')
  if (footer) footer.scrollIntoView({ block: 'center' })
})
await page.waitForTimeout(300)
await page.screenshot({
  path: 'output/playwright/chips-alignment-mobile.png',
  clip: { x: 0, y: 200, width: 390, height: 320 }
})

await browser.close()

const allMaxSkew = Math.max(...results.map((r) => Math.abs(r.textSkew)))
const iconResults = results.filter((r) => r.iconTextDelta !== null)
const allMaxIconText = iconResults.length
  ? Math.max(...iconResults.map((r) => r.iconTextDelta))
  : 0

console.log(`Overall max |textSkew|: ${allMaxSkew.toFixed(2)}px`)
console.log(`Overall max |icon↔text|: ${allMaxIconText.toFixed(2)}px`)

const failed = allMaxSkew > 2 || allMaxIconText > 0.75
process.exit(failed ? 1 : 0)
