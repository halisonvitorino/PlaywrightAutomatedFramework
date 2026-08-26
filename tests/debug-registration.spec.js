// Debug script to check what's on the home page and registration flow
const { test, expect } = require('@playwright/test');

test('Debug: Check home page and registration link', async ({ page }) => {
  // Start from the home page
  await page.goto('https://bugbank.netlify.app/');
  await page.waitForLoadState('networkidle');

  console.log('Current URL:', page.url());
  console.log('Page title:', await page.title());

  // Take a screenshot of the home page
  await page.screenshot({ path: 'test-results/debug-home-page.png' });

  // Analyze the initial page state in detail
  console.log('\n=== Detailed Initial Page Analysis ===');

  // Get all input elements and their attributes
  const allInputs = await page.$$('input');
  console.log(`Found ${allInputs.length} total input elements:`);

  for (let i = 0; i < allInputs.length; i++) {
    const placeholder = await allInputs[i].getAttribute('placeholder');
    const type = await allInputs[i].getAttribute('type');
    const name = await allInputs[i].getAttribute('name');
    const id = await allInputs[i].getAttribute('id');
    const className = await allInputs[i].getAttribute('class');
    console.log(`  Input ${i}: placeholder="${placeholder}", type="${type}", name="${name}", id="${id}", class="${className}"`);
  }

  // Get all button elements and their text
  const allButtons = await page.$$('button');
  console.log(`\\nFound ${allButtons.length} total button elements:`);

  for (let i = 0; i < allButtons.length; i++) {
    const text = await allButtons[i].textContent();
    const type = await allButtons[i].getAttribute('type');
    const className = await allButtons[i].getAttribute('class');
    console.log(`  Button ${i}: text="${text.trim()}", type="${type}", class="${className}"`);
  }

  // Check for links that might lead to registration
  const allLinks = await page.$$('a');
  console.log(`\\nFound ${allLinks.length} total link elements:`);

  for (let i = 0; i < Math.min(allLinks.length, 10); i++) { // Limit to first 10 links
    const text = await allLinks[i].textContent();
    const href = await allLinks[i].getAttribute('href');
    console.log(`  Link ${i}: text="${text.trim()}", href="${href}"`);
  }

  // Look for specific text patterns in the page
  const pageText = await page.innerHTML('body');
  console.log(`\\nPage text contains:`);
  console.log('  "Registrar":', pageText.includes('Registrar'));
  console.log('  "Cadastrar":', pageText.includes('Cadastrar'));
  console.log('  "Nome":', pageText.includes('Nome'));
  console.log('  "E-mail":', pageText.includes('E-mail'));
  console.log('  "Senha":', pageText.includes('Senha'));
  console.log('  "Confirmar Senha":', pageText.includes('Confirmar Senha'));

  // Try to find elements by exact text content
  console.log('\\n=== Searching for elements by text ===');

  // Search for buttons with specific text
  const registrarButtons = await page.$$('button:has-text("Registrar")');
  const cadastrarButtons = await page.$$('button:has-text("Cadastrar")');
  const entrarButtons = await page.$$('button:has-text("Entrar")');
  const loginButtons = await page.$$('button:has-text("Login")');

  console.log(`Buttons with text "Registrar": ${registrarButtons.length}`);
  console.log(`Buttons with text "Cadastrar": ${cadastrarButtons.length}`);
  console.log(`Buttons with text "Entrar": ${entrarButtons.length}`);
  console.log(`Buttons with text "Login": ${loginButtons.length}`);

  // Search for inputs by placeholder
  const nomeInputs = await page.$$('input[placeholder="Nome"]');
  const emailInputs = await page.$$('input[placeholder="E-mail"]');
  const senhaInputs = await page.$$('input[placeholder="Senha"]');
  const confirmarSenhaInputs = await page.$$('input[placeholder="Confirmar Senha"]');

  console.log(`\\nInputs by placeholder:`);
  console.log(`  placeholder="Nome": ${nomeInputs.length}`);
  console.log(`  placeholder="E-mail": ${emailInputs.length}`);
  console.log(`  placeholder="Senha": ${senhaInputs.length}`);
  console.log(`  placeholder="Confirmar Senha": ${confirmarSenhaInputs.length}`);

  // Try case-insensitive and partial matches
  const nomeInputsCI = await page.$$('input[placeholder*="nome" i]');
  const emailInputsCI = await page.$$('input[placeholder*="e-mail" i]');
  const senhaInputsCI = await page.$$('input[placeholder*="senha" i]');
  const confirmarSenhaInputsCI = await page.$$('input[placeholder*="confirmar" i]');

  console.log(`\\nCase-insensitive inputs:`);
  console.log(`  *[placeholder*="nome" i]: ${nomeInputsCI.length}`);
  console.log(`  *[placeholder*="e-mail" i]: ${emailInputsCI.length}`);
  console.log(`  *[placeholder*="senha" i]: ${senhaInputsCI.length}`);
  console.log(`  *[placeholder*="confirmar" i]: ${confirmarSenhaInputsCI.length}`);

  // Check if clicking any buttons navigates us somewhere
  console.log('\\n=== Testing button clicks ===');

  // Test clicking the cadastrar button if it exists
  if (cadastrarButtons.length > 0) {
    console.log('Testing click on Cadastrar button...');
    const urlBefore = page.url();
    await cadastrarButtons[0].click();
    await page.waitForTimeout(2000);
    const urlAfter = page.url();
    console.log(`  URL before: ${urlBefore}`);
    console.log(`  URL after: ${urlAfter}`);
    console.log(`  URL changed: ${urlBefore !== urlAfter}`);

    if (urlBefore !== urlAfter) {
      // Navigated somewhere, check what's there
      await page.screenshot({ path: 'test-results/debug-after-cadastrar-button.png' });
    } else {
      // Stayed on same page, check if form appeared
      await page.screenshot({ path: 'test-results/debug-after-cadastrar-button-same-page.png' });

      // Check for new form elements
      const nomeAfter = await page.$$('input[placeholder*="nome" i]').length;
      const emailAfter = await page.$$('input[placeholder*="e-mail" i]').length;
      const senhaAfter = await page.$$('input[placeholder*="senha" i]').length;
      const confirmarSenhaAfter = await page.$$('input[placeholder*="confirmar" i]').length;

      console.log(`  Form elements after button click:`);
      console.log(`    Nome inputs: ${nomeAfter}`);
      console.log(`    Email inputs: ${emailAfter}`);
      console.log(`    Senha inputs: ${senhaAfter}`);
      console.log(`    Confirmar Senha inputs: ${confirmarSenhaAfter}`);
    }

    // Go back if needed
    if (urlBefore !== urlAfter) {
      await page.goto('https://bugbank.netlify.app/');
      await page.waitForLoadState('networkidle');
    }
  }

  // Test clicking links
  const registrarLinks = await page.$$('a:has-text("Registrar"), a:has-text("Cadastrar")');
  console.log(`\\nFound ${registrarLinks.length} registration links (a tags)`);

  for (let i = 0; i < Math.min(registrarLinks.length, 2); i++) {
    const linkText = await registrarLinks[i].textContent();
    console.log(`\\nTesting click on registration link ${i}: "${linkText.trim()}"`);

    const urlBefore = page.url();
    await registrarLinks[i].click();
    await page.waitForTimeout(2000);
    const urlAfter = page.url();

    console.log(`  URL before: ${urlBefore}`);
    console.log(`  URL after: ${urlAfter}`);
    console.log(`  URL changed: ${urlBefore !== urlAfter}`);

    await page.screenshot({ path: `test-results/debug-after-registration-link-${i}.png` });

    // Go back for next test
    if (i < Math.min(registrarLinks.length, 2) - 1) {
      await page.goto('https://bugbank.netlify.app/');
      await page.waitForLoadState('networkidle');
    }
  }
});