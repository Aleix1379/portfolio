import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

await mkdir('output/playwright', { recursive: true })

const url = process.argv[2] ?? 'http://127.0.0.1:4329/'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1400, height: 1200 } })
await page.goto(url, { waitUntil: 'networkidle' })

const data = await page.evaluate(() => {
  const measure = (el) => {
    const box = el.getBoundingClientRect()
    const borderTop = parseFloat(getComputedStyle(el).borderTopWidth) || 0
    const borderBottom = parseFloat(getComputedStyle(el).borderBottomWidth) || 0
    const innerTop = box.top + borderTop
    const innerBottom = box.bottom - borderBottom

    const track = el.querySelector(':scope > [class*="badgeTrack"]')
    const content = track
      ? track.querySelector(':scope > [class*="badgeIcon"]')
        ? track
        : track.querySelector(':scope > :last-child') || track
      : el.querySelector(':scope > [class*="badgeLabel"]') || el
    const contentRect = content.getBoundingClientRect()
    const trackBox = (track || content).getBoundingClientRect()
    const trackTopGap = trackBox.top - innerTop
    const trackBottomGap = innerBottom - trackBox.bottom
    const textTopGap = contentRect.top - innerTop
    const textBottomGap = innerBottom - contentRect.bottom

    return {
      text: (el.textContent || '').trim().slice(0, 28),
      h: Math.round(box.height * 10) / 10,
      trackTop: Math.round(trackTopGap * 100) / 100,
      trackBot: Math.round(trackBottomGap * 100) / 100,
      textTop: Math.round(textTopGap * 100) / 100,
      textBot: Math.round(textBottomGap * 100) / 100,
      textSkew: Math.round((textBottomGap - textTopGap) * 100) / 100
    }
  }

  const pick = (sel, group, limit = 6) =>
    [...document.querySelectorAll(sel)]
      .slice(0, limit)
      .map((el) => ({ group, ...measure(el) }))

  return [
    ...pick('[aria-label="Portfolio highlights"] [class*="chip"]', 'stat', 3),
    ...pick('#header [class*="note"]', 'availability', 1),
    ...pick('[class*="technologies"] a', 'tech', 6),
    ...pick('[class*="tabItem"]', 'tab', 4),
    ...pick('[class*="linkPrimary"]', 'store', 3),
    ...pick('footer a[class*="linkAction"]', 'footer', 3)
  ]
})

console.log(
  'Visual gap (textSkew > 0 → text looks HIGH; target |skew| ≤ 0.75px)\n'
)
for (const row of data) {
  const flag = Math.abs(row.textSkew) > 0.75 ? ' ⚠' : ''
  console.log(
    `${row.group.padEnd(12)} ${row.text.padEnd(28)} h=${row.h}  text↑${row.textTop} text↓${row.textBot} skew=${row.textSkew}${flag}`
  )
}

await page.screenshot({
  path: 'output/playwright/chips-visual-check.png',
  fullPage: false,
  clip: { x: 0, y: 380, width: 1400, height: 720 }
})

await browser.close()

const bad = data.filter((r) => Math.abs(r.textSkew) > 0.75)
const maxSkew = Math.max(...data.map((r) => Math.abs(r.textSkew)))
console.log(`\nMax |skew|: ${maxSkew.toFixed(2)}px — ${bad.length} outliers`)
process.exit(bad.length > 0 ? 1 : 0)
