import { defineConfig, devices } from '@playwright/test'
import baseConfig from './playwright.config.ts'

export default defineConfig({
  ...baseConfig,
  webServer: undefined,
  use: {
    ...baseConfig.use,
    baseURL: 'http://localhost:4321'
  },
  projects: [
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] }
    }
  ]
})
