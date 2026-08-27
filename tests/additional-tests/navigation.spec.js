// Navigation tests for BugBank site
const { test, expect } = require('@playwright/test');

test.describe('Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://bugbank.netlify.app/');
    await page.click(\"button:has-text('Registrar')\");
    await expect(page.locator('form').filter({ hasText: 'Voltar ao login' })).toBeVisible();
  });

  test('Should navigate to login page from registration page', async ({ page }) => {
    // Assuming there is a link to go back to login
    const loginLink = page.locator('text=Voltar ao login');
    await expect(loginLink).toBeVisible();
    await loginLink.click();
    // After clicking, we should be on the login page
    await expect(page.locator('text=Entrar')).toBeVisible({ timeout: 5000 });
  });
});
