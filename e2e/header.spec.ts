import { test, expect, type Page } from '@playwright/test'

const viewports = [320, 390, 768, 1024, 1440, 1701]

async function openHeader(page: Page) {
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('data-theme', /dark|light/)
  await page.evaluate(() => document.fonts.ready)
}

async function expectProjectsBelowNavigation(page: Page) {
  await expect(page).toHaveURL(/#projects$/)
  await expect
    .poll(() =>
      page.evaluate(() => {
        const heading = document
          .querySelector('#projects h2')!
          .getBoundingClientRect()
        const nav = document
          .getElementById('navContainer')!
          .getBoundingClientRect()
        return heading.top - nav.bottom
      })
    )
    .toBeGreaterThanOrEqual(15)
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          document.querySelector('#projects h2')!.getBoundingClientRect().top
      )
    )
    .toBeLessThan(200)
}

async function expectNoOverflow(page: Page) {
  await expect
    .poll(
      () =>
        page.evaluate(() => {
          const hero = document.getElementById('header')!
          return Math.max(
            document.documentElement.scrollWidth -
              document.documentElement.clientWidth,
            hero.scrollWidth - hero.clientWidth
          )
        }),
      {
        message:
          'The page and presentation should fit the available width after layout settles'
      }
    )
    .toBeLessThanOrEqual(1)
}

test.describe('Portfolio presentation', () => {
  test('separates the introduction and about copy into readable paragraphs', async ({ page }) => {
    await openHeader(page)
    const personalProjects = page.locator('#header p').filter({
      hasText: 'I also build my own web and mobile products.'
    })
    await expect(personalProjects).toHaveText('I also build my own web and mobile products.')
    const aboutParagraphs = page.locator('#about > div:last-child p')
    await expect(aboutParagraphs).toHaveCount(4)
    await expect(aboutParagraphs.nth(1)).toContainText('At Talkual')
    const spacing = await personalProjects.evaluate(paragraph => {
      const previous = paragraph.previousElementSibling!.getBoundingClientRect()
      return paragraph.getBoundingClientRect().top - previous.bottom
    })
    // Firefox can round the 12px grid gap to 11.99997px.
    expect(spacing).toBeGreaterThanOrEqual(12 - 0.01)
  })

  test('opens projects and contact through native links', async ({ page }) => {
    await openHeader(page)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      "I'm Aleix."
    )
    const projects = page.getByRole('link', {
      name: 'View projects',
      exact: true
    })
    await expect(projects).toHaveAttribute('href', '#projects')
    await projects.click()
    await expectProjectsBelowNavigation(page)
    const contact = page.locator('#header a[href="#contact"]')
    await expect(contact).toHaveText('Get in touch')
    await contact.click()
    await expect(page).toHaveURL(/#contact$/)
  })

  test('supports keyboard focus and activation', async ({ page }) => {
    await openHeader(page)
    const link = page.getByRole('link', { name: 'View projects', exact: true })
    await link.focus()
    await expect(link).toBeFocused()
    await expect(link).toHaveCSS('outline-style', 'solid')
    await expect(link).toHaveCSS('outline-width', '2px')
    await page.keyboard.press('Enter')
    await expectProjectsBelowNavigation(page)
  })

  test('preserves visible focus when switching themes and reloading', async ({
    page
  }) => {
    await openHeader(page)
    const toggle = page.getByRole('button', { name: 'Dark theme', exact: true })
    for (const theme of ['light', 'dark']) {
      await toggle.focus()
      await page.keyboard.press('Enter')
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme)
      await expect(toggle).toHaveAttribute(
        'aria-pressed',
        String(theme === 'dark')
      )
      const cta = page.getByRole('link', { name: 'View projects', exact: true })
      await cta.focus()
      await expect(cta).toBeFocused()
      await expect(cta).toHaveCSS('outline-style', 'solid')
      await expect(cta).toHaveCSS('outline-width', '2px')
      await page.reload()
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme)
    }
  })

  test('keeps navigation height and position stable on scroll', async ({
    page
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await openHeader(page)
    const nav = page.locator('#navContainer')
    const before = await nav.boundingBox()
    await page.evaluate(() =>
      window.scrollTo({ top: 1000, behavior: 'instant' })
    )
    await expect
      .poll(async () => (await nav.boundingBox())!.y)
      .toBeLessThanOrEqual(1)
    const after = await nav.boundingBox()
    expect(after!.height).toBe(before!.height)
    expect(after!.width).toBe(before!.width)
    await page.setViewportSize({ width: 390, height: 900 })
    await expect(nav.locator('summary')).toBeVisible()
    await expectNoOverflow(page)
  })

  test('shows the first project preview early on desktop and mobile', async ({
    page
  }) => {
    for (const viewport of [
      { width: 1440, height: 900, limit: 900 },
      { width: 390, height: 844, limit: 1688 }
    ]) {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height
      })
      await openHeader(page)
      const preview = page.locator('#projects article img').first()
      await expect(preview).toBeVisible()
      const top = await preview.evaluate(
        image => image.getBoundingClientRect().top + window.scrollY
      )
      expect(top).toBeLessThan(viewport.limit)
    }
  })

  test('respects reduced motion throughout the page', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await openHeader(page)
    await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto')
    const motion = await page
      .locator('#header, #navContainer, #projects article, #experience article')
      .evaluateAll(elements =>
        elements.map(element => ({
          animation: getComputedStyle(element).animationName,
          transition: getComputedStyle(element).transitionDuration
        }))
      )
    for (const item of motion) {
      expect(item.animation).toBe('none')
      expect(
        item.transition.split(',').every(duration => parseFloat(duration) === 0)
      ).toBe(true)
    }
    await page.getByRole('link', { name: 'View projects', exact: true }).click()
    await expectProjectsBelowNavigation(page)
  })

  test(
    'keeps the avatar accessible without manual animation controls',
    async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.setViewportSize({ width: 1440, height: 900 })
      await openHeader(page)
      const illustration = page.locator('#header [data-animating]')
      await expect(
        page.getByRole('img', {
          name: 'Illustration of Aleix sitting with a laptop'
        })
      ).toBeVisible()
      await expect(illustration).toHaveAttribute('data-animating', 'false')
      await expect(
        page.getByRole('button', { name: /animation/i })
      ).toHaveCount(0)
    }
  )

  for (const theme of ['dark', 'light']) {
    test(`reflows across viewports in ${theme} theme`, async ({ page }) => {
      await page.addInitScript(
        theme => localStorage.setItem('portfolio-theme', theme),
        theme
      )
      for (const width of viewports) {
        await page.setViewportSize({ width, height: 1000 })
        await openHeader(page)
        await expect(page.locator('html')).toHaveAttribute('data-theme', theme)
        await expectNoOverflow(page)
        for (const element of await page
          .locator('#header h1, #header p, #header a, #header img')
          .all()) {
          const bounds = await element.boundingBox()
          expect(bounds!.x).toBeGreaterThanOrEqual(0)
          expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width + 1)
        }
      }
    })
  }

  test('reflows at 320px with text enlarged to 200 percent', async ({
    page
  }) => {
    await page.setViewportSize({ width: 320, height: 1000 })
    await openHeader(page)
    await page.evaluate(() => {
      document.documentElement.style.fontSize = '200%'
    })
    await expectNoOverflow(page)
    await page.getByRole('link', { name: 'View projects', exact: true }).click()
    await expect(page).toHaveURL(/#projects$/)
  })

  test('keeps navigation, its mobile panel and the project link operable at 200 percent CSS zoom in both themes', async ({
    page
  }) => {
    await page.setViewportSize({ width: 320, height: 1000 })
    for (const theme of ['dark', 'light']) {
      await openHeader(page)
      if (theme === 'light')
        await page
          .getByRole('button', { name: 'Dark theme', exact: true })
          .click()
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme)
      await page.evaluate(() => {
        document.body.style.zoom = '2'
      })
      await expectNoOverflow(page)
      const menu = page.locator('#navContainer details')
      await menu.locator('summary').click()
      await expect(menu).toHaveAttribute('open', '')
      const panel = menu.locator('ul')
      await expect(panel).toBeVisible()
      const panelBox = await panel.boundingBox()
      expect(panelBox!.x).toBeGreaterThanOrEqual(0)
      expect(panelBox!.x + panelBox!.width).toBeLessThanOrEqual(321)
      await expectNoOverflow(page)
      await menu.locator('summary').click()
      await page
        .getByRole('link', { name: 'View projects', exact: true })
        .click()
      await expect(page).toHaveURL(/#projects$/)
    }
  })
})

test.describe('Server-rendered presentation', () => {
  test.use({ javaScriptEnabled: false, reducedMotion: 'reduce' })

  test('renders the dark theme and native project navigation without JavaScript', async ({
    page
  }) => {
    await page.goto('/')
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      "I'm Aleix."
    )
    await expect(page.locator('#header')).not.toHaveCSS(
      'color',
      'rgba(0, 0, 0, 0)'
    )
    await page.getByRole('link', { name: 'View projects', exact: true }).click()
    await expectProjectsBelowNavigation(page)
  })
})
