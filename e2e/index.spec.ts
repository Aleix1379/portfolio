import { expect, test } from '@playwright/test'

test('should download resume', async ({ page }) => {
	console.info('process.env.WEB_URL', process.env.WEB_URL)
	await page.goto(process.env.WEB_URL || 'http://localhost:3000/')
	await page.click('button')
	const [download] = await Promise.all([
		page.waitForEvent('download'),
		page.click('button')
	])
	expect(download.suggestedFilename()).toBe('cv.pdf')
	await download.path()
})
