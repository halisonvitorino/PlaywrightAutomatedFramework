import { test, expect } from '@playwright/test';

test('check register link', async ({ page }) => {
  await page.goto('https://bugbank.netlify.app/');
  await page.waitForTimeout(2000); // wait for 2 seconds
  const link = page.locator('a[href="/register"]');
  console.log('Link count:', await link.count());
  console.log('Link visible:', await link.isVisible());
  const text = page.getByText('Registrar');
  console.log('Text count:', await text.count());
  console.log('Text visible:', await text.isVisible());
  // Also print the innerHTML of the body to see what's there
  const bodyHTML = await page.locator('body').innerHTML();
  console.log('Body HTML snippet:', bodyHTML.substring(0, 1000));
});