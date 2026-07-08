import { chromium } from 'playwright'

const url = process.argv[2] ?? 'http://127.0.0.1:4329/'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1400, height: 1200 } })
await page.goto(url, { waitUntil: 'networkidle' })

// Simulate browsers without text-box-trim (Firefox, older Chromium, Safari).
await page.addStyleTag({
  content: `
    .badgeLabel { text-box-trim: none !important; }
  `
})

const data = await page.evaluate(() => {
  const measure = el => {
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
    const textTopGap = contentRect.top - innerTop
    const textBottomGap = innerBottom - contentRect.bottom

    return {
      text: (el.textContent || '').trim().slice(0, 28),
      textSkew: Math.round((textBottomGap - textTopGap) * 100) / 100
    }
  }

  const pick = (sel, group, limit = 6) =>
    [...document.querySelectorAll(sel)]
      .slice(0, limit)
      .map(el => ({ group, ...measure(el) }))

  return [
    ...pick('[aria-label="Portfolio highlights"] [class*="chip"]', 'stat', 3),
    ...pick('[class*="technologies"] a', 'tech', 4),
    ...pick('[class*="tabItem"]', 'tab', 3),
    ...pick('[class*="linkPrimary"]', 'store', 2),
    ...pick('footer a[class*="linkAction"]', 'footer', 3)
  ]
})

console.log(
  'No-trim fallback (target skew in [-2px, 0px] — slightly low = optically centered)\n'
)
for (const row of data) {
  const ok = row.textSkew <= 0 && row.textSkew >= -2
  console.log(
    `${row.group.padEnd(8)} ${row.text.padEnd(28)} skew=${row.textSkew}${ok ? '' : ' ⚠'}`
  )
}

await browser.close()

const bad = data.filter(r => r.textSkew > 0 || r.textSkew < -2.15)
process.exit(bad.length > 0 ? 1 : 0)
