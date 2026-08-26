// Debug script to see what error messages are actually present
const { test, expect } = require('@playwright/test');

test('Debug: Check what error messages are present', async ({ page }) => {
  // Start from the home page
  await page.goto('https://bugbank.netlify.app/');
  await page.waitForLoadState('networkidle');

  // Switch to registration form
  await page.click('button:has-text("Registrar")');
  await page.waitForTimeout(1000);

  // Take screenshot of empty form
  await page.screenshot({ path: 'test-results/debug-empty-form.png' });

  // Submit without filling anything
  await page.click('button:has-text("Cadastrar")');

  // Wait for validation messages
  await page.waitForTimeout(2000);

  // Take screenshot after submit
  await page.screenshot({ path: 'test-results/debug-after-submit.png' });

  // Get all text content from the page
  const pageText = await page.textContent('body');
  console.log('Full page text:');
  console.log(pageText);

  // Look for specific error patterns
  console.log('\n=== Checking for error patterns ===');
  const patterns = [
    'É campo obrigatório',
    'Este campo é obrigatório',
    'O campo Nome é obrigatório',
    'O campo E-mail é obrigatório',
    'O campo Senha é obrigatório',
    'O campo Confirmar Senha é obrigatório',
    'E-mail inválido',
    'Erro'
  ];

  for (const pattern of patterns) {
    const found = pageText.includes(pattern);
    console.log(`${pattern}: ${found ? 'FOUND' : 'NOT FOUND'}`);
  }

  // Try to find elements with specific text using Playwright selectors
  console.log('\n=== Trying Playwright selectors ===');
  const selectors = [
    'text=É campo obrigatório',
    'text=Este campo é obrigatório',
    'text=/É campo obrigatório/i',
    'text=/Este campo é obrigatório/i',
    ':text("É campo obrigatório")',
    ':text("Este campo é obrigatório")',
    ':text-is("É campo obrigatório")',
    ':text-is("Este campo é obrigatório")'
  ];

  for (const selector of selectors) {
    try {
      const elements = await page.$$(selector);
      console.log(`${selector}: ${elements.length} elements found`);
      if (elements.length > 0) {
        for (let i = 0; i < Math.min(elements.length, 3); i++) {
          const text = await elements[i].textContent();
          console.log(`  Element ${i}: "${text.trim()}"`);
        }
      }
    } catch (e) {
      console.log(`${selector}: ERROR - ${e.message}`);
    }
  }

  // Check what's actually near the input fields
  console.log('\n=== Checking near input fields ===');
  const inputs = await page.$$('input');
  for (let i = 0; i < inputs.length; i++) {
    const placeholder = await inputs[i].getAttribute('placeholder');
    console.log(`Input ${i} placeholder: "${placeholder}"`);

    // Try to find parent element and see what text it contains
    try {
      const parent = await inputs[i].evaluate(el => el.parentElement);
      if (parent) {
        const parentText = parent.textContent.trim();
        console.log(`  Parent text: "${parentText.substring(0, 100)}..."`);
      }
    } catch (e) {
      console.log(`  Could not get parent: ${e.message}`);
    }
  }
});