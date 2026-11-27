import { defineConfig, devices } from '@playwright/test'
import path from 'node:path'

const artifacts = process.env.PORTFOLIO_ARTIFACT_DIR || 'test-results'
const port = Number(process.env.PORTFOLIO_TEST_PORT ?? 4322)
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORTFOLIO_TEST_PORT must be a valid TCP port')
}

export default defineConfig({
  testDir: './e2e',
  outputDir: path.join(artifacts, 'results'),
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { outputFolder: path.join(artifacts, 'report'), open: 'never' }]],
  use: {
    baseURL: `http://localhost:${port}`,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: `npm run preview -- --host 127.0.0.1 --port ${port} --ignore-lock`,
    port,
    reuseExistingServer: !process.env.CI,
  },
});
