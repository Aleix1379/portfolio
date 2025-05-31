import { test, expect } from '@playwright/test';

test.describe('Portfolio Website Navigation', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto('/');
    
    // Check if the page title is correct
    await expect(page).toHaveTitle(/Portfolio/);
  });
  
  test('should navigate to About section', async ({ page }) => {
    await page.goto('/');
    
    // Find and click the About link (assuming there's a navigation menu)
    await page.getByRole('link', { name: /about/i }).click();
    
    // Check if the About section is visible
    await expect(page.getByRole('heading', { name: 'About me' })).toBeVisible();
  });
  
  test('should have a Download CV button in About section', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to About section if needed
    if (!(await page.getByText('About me').isVisible())) {
      await page.getByRole('link', { name: /about/i }).click();
    }
    
    // Check if the Download CV button exists
    await expect(page.getByRole('button', { name: 'Download CV' })).toBeVisible();
  });
  
  test('should display years of experience in About section', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to About section if needed
    if (!(await page.getByText('About me').isVisible())) {
      await page.getByRole('link', { name: /about/i }).click();
    }
    
    // Check if the years of experience text is visible
    await expect(page.getByText(/years of experience as a web developer/i)).toBeVisible();
  });
});