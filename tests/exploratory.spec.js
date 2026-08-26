// Exploratory testing script for BugBank signup feature
// This script follows the test plan from specs/bugbank-test-plan.md
// and performs manual-like exploration to gather insights for automation.

const { test, expect } = require('@playwright/test');

test.describe('Exploratory Testing: BugBank SignUp Feature', () => {
  test.beforeEach(async ({ page }) => {
    // Start from the home page
    await page.goto('https://bugbank.netlify.app/');
    // Wait for page to load
    await page.waitForLoadState('networkidle');
  });

  test('CT-001: Happy path - Valid registration', async ({ page }) => {
    console.log('\n=== CT-001: Cadastro com dados válidos ===');

    // Click the register button to switch to registration form
    await page.click('button:has-text("Registrar")');
    await page.waitForTimeout(1000); // Wait for form to switch

    // Verify we're now seeing registration form
    const nomeInput = await page.$('input[placeholder="Informe seu Nome"]');
    const emailInput = await page.$('input[placeholder="Informe seu e-mail"]');
    const senhaInput = await page.$('input[placeholder="Informe sua senha"]');
    const confirmarSenhaInput = await page.$('input[placeholder="Informe a confirmação da senha"]');
    const cadastrarButton = await page.$('button:has-text("Cadastrar")');

    console.log('Registration form elements found:');
    console.log('  Nome input:', !!nomeInput);
    console.log('  Email input:', !!emailInput);
    console.log('  Senha input:', !!senhaInput);
    console.log('  Confirmar Senha input:', !!confirmarSenhaInput);
    console.log('  Cadastrar button:', !!cadastrarButton);

    // Fill form with valid data
    await nomeInput.fill('João Silva');
    await emailInput.fill('joao.silva@email.com');
    await senhaInput.fill('Senha123!');
    await confirmarSenhaInput.fill('Senha123!');

    // Take screenshot before submit
    await page.screenshot({ path: 'test-results/exploratory-CT-001-before-submit.png' });

    // Submit
    await cadastrarButton.click();

    // Wait for potential response
    await page.waitForTimeout(3000);

    // Check for success message by looking for it in the page content
    let successFound = false;
    let errorFound = false;

    try {
      // Look for success message in various ways
      const successElements = await page.$$('text=/Cadastro realizado com sucesso!/i');
      successFound = successElements.length > 0;

      // Also check page text content
      const pageText = await page.textContent('body');
      if (pageText.includes('Cadastro realizado com sucesso!')) {
        successFound = true;
      }
    } catch (e) {
      console.log('Error checking for success message:', e.message);
    }

    if (successFound) {
      console.log('✓ Success message found: Cadastro realizado com sucesso!');
    } else {
      console.log('✗ Success message not found');
      // Check for any error messages
      try {
        const errorElements = await page.$$('text=/Erro|error|falha|inválido/i');
        if (errorElements.length > 0) {
          const errorText = await errorElements[0].textContent();
          console.log('Error found:', errorText.trim());
        }
      } catch (e) {
        console.log('Could not check for error messages');
      }
    }

    // Check if redirected to home or stayed on same page
    const url = page.url();
    if (url === 'https://bugbank.netlify.app/') {
      console.log('✓ Still on home page after registration:', url);
    } else {
      console.log('? Current URL after registration:', url);
    }

    // Take screenshot after submit
    await page.screenshot({ path: 'test-results/exploratory-CT-001-after-submit.png' });
  });

  test('CT-003: Submit form with all fields empty', async ({ page }) => {
    console.log('\n=== CT-003: Submeter formulário com todos os campos vazios ===');

    // Click the register button to switch to registration form
    await page.click('button:has-text("Registrar")');
    await page.waitForTimeout(1000);

    // Take screenshot of empty form
    await page.screenshot({ path: 'test-results/exploratory-CT-003-empty-form.png' });

    // Submit without filling anything
    const cadastrarButton = await page.$('button:has-text("Cadastrar")');
    await cadastrarButton.click();

    // Wait for validation messages
    await page.waitForTimeout(1000);

    // Check for error messages by looking for them in the page
    const nomeError = await page.$$('text=/O campo Nome é obrigatório/i').length > 0;
    const emailError = await page.$$('text=/O campo E-mail é obrigatório/i').length > 0;
    const senhaError = await page.$$('text=/O campo Senha é obrigatório/i').length > 0;
    const confirmarSenhaError = await page.$$('text=/O campo Confirmar Senha é obrigatório/i').length > 0;

    console.log('Nome error:', nomeError ? 'Found' : 'Not found');
    console.log('Email error:', emailError ? 'Found' : 'Not found');
    console.log('Senha error:', senhaError ? 'Found' : 'Not found');
    console.log('Confirmar Senha error:', confirmarSenhaError ? 'Found' : 'Not found');

    // Take screenshot after submit
    await page.screenshot({ path: 'test-results/exploratory-CT-003-after-submit.png' });
  });

  test('CT-005: Invalid email format (without @)', async ({ page }) => {
    console.log('\n=== CT-005: E-mail em formato inválido (sem @) ===');

    // Click the register button to switch to registration form
    await page.click('button:has-text("Registrar")');
    await page.waitForTimeout(1000);

    // Fill form with invalid email
    const nomeInput = await page.$('input[placeholder="Informe seu Nome"]');
    const emailInput = await page.$('input[placeholder="Informe seu e-mail"]');
    const senhaInput = await page.$('input[placeholder="Informe sua senha"]');
    const confirmarSenhaInput = await page.$('input[placeholder="Informe a confirmação da senha"]');

    await nomeInput.fill('Carlos Mendes');
    await emailInput.fill('carlosmendesemail.com'); // no @
    await senhaInput.fill('Senha123!');
    await confirmarSenhaInput.fill('Senha123!');

    await page.screenshot({ path: 'test-results/exploratory-CT-005-before-submit.png' });

    const cadastrarButton = await page.$('button:has-text("Cadastrar")');
    await cadastrarButton.click();
    await page.waitForTimeout(1000);

    // Check for email-specific error
    const emailError = await page.$$('text=/E-mail inválido/i').length > 0;
    if (emailError) {
      const errorElement = await page.$$('text=/E-mail inválido/i')[0];
      const errorText = await errorElement.textContent();
      console.log('✓ Email error found:', errorText.trim());
    } else {
      console.log('✗ Email error not found');
      // Check for generic required field error
      const genericError = await page.$$('text=/Este campo é obrigatório/i').length > 0;
      console.log('Generic error:', genericError ? 'Found' : 'Not found');
    }

    await page.screenshot({ path: 'test-results/exploratory-CT-005-after-submit.png' });
  });

  test('CT-008: Name with only spaces', async ({ page }) => {
    console.log('\n=== CT-008: Campo Nome com apenas espaços em branco ===');

    // Click the register button to switch to registration form
    await page.click('button:has-text("Registrar")');
    await page.waitForTimeout(1000);

    // Fill form with spaces in name
    const nomeInput = await page.$('input[placeholder="Informe seu Nome"]');
    const emailInput = await page.$('input[placeholder="Informe seu e-mail"]');
    const senhaInput = await page.$('input[placeholder="Informe sua senha"]');
    const confirmarSenhaInput = await page.$('input[placeholder="Informe a confirmação da senha"]');

    await nomeInput.fill('   ');
    await emailInput.fill('teste@email.com');
    await senhaInput.fill('Senha123!');
    await confirmarSenhaInput.fill('Senha123!');

    await page.screenshot({ path: 'test-results/exploratory-CT-008-before-submit.png' });

    const cadastrarButton = await page.$('button:has-text("Cadastrar")');
    await cadastrarButton.click();
    await page.waitForTimeout(1000);

    // Check for name error
    const nomeError = await page.$$('text=/O campo Nome é obrigatório/i').length > 0;
    if (nomeError) {
      const errorElement = await page.$$('text=/O campo Nome é obrigatório/i')[0];
      const errorText = await errorElement.textContent();
      console.log('✓ Nome error found:', errorText.trim());
    } else {
      console.log('✗ Nome error not found');
    }

    await page.screenshot({ path: 'test-results/exploratory-CT-008-after-submit.png' });
  });

  test('CT-017: Navigation to registration page from home', async ({ page }) => {
    console.log('\n=== CT-017: Navegação para página de cadastro a partir da home ===');

    // Already on home page from beforeEach
    await page.screenshot({ path: 'test-results/exploratory-CT-017-home.png' });

    // Click register button to switch to registration form
    await page.click('button:has-text("Registrar")');
    await page.waitForTimeout(1000);

    await page.screenshot({ path: 'test-results/exploratory-CT-017-register-page.png' });

    const url = page.url();
    console.log('URL after clicking register:', url);
    if (url === 'https://bugbank.netlify.app/') {
      console.log('✓ Still on home page (form switched via JS)');
    } else {
      console.log('? Navigated to different URL:', url);
    }

    // Check that form elements are visible
    const nomeInput = await page.$('input[placeholder="Informe seu Nome"]');
    const emailInput = await page.$('input[placeholder="Informe seu e-mail"]');
    const senhaInput = await page.$('input[placeholder="Informe sua senha"]');
    const confirmarSenhaInput = await page.$('input[placeholder="Informe a confirmação da senha"]');
    const cadastrarButton = await page.$('button:has-text("Cadastrar")');

    console.log('Nome input visible:', !!nomeInput);
    console.log('Email input visible:', !!emailInput);
    console.log('Senha input visible:', !!senhaInput);
    console.log('Confirmar Senha input visible:', !!confirmarSenhaInput);
    console.log('Cadastrar button visible:', !!cadastrarButton);
  });

  test('CT-021: Verify presence of all form elements', async ({ page }) => {
    console.log('\n=== CT-021: Verificação de presença de todos os elementos do formulário ===');

    // Click the register button to switch to registration form
    await page.click('button:has-text("Registrar")');
    await page.waitForTimeout(1000);

    const elements = [
      { selector: 'input[placeholder="Informe seu Nome"]', name: 'Nome' },
      { selector: 'input[placeholder="Informe seu e-mail"]', name: 'E-mail' },
      { selector: 'input[placeholder="Informe sua senha"]', name: 'Senha' },
      { selector: 'input[placeholder="Informe a confirmação da senha"]', name: 'Confirmar Senha' },
      { selector: 'button:has-text("Cadastrar")', name: 'Botão Cadastrar' },
      { selector: 'text=Já tem conta? Fazer login', name: 'Link de login' }
    ];

    for (const element of elements) {
      const isVisible = await page.isVisible(element.selector);
      console.log(`${element.name} visible:`, isVisible);
      if (!isVisible) {
        console.log(`✗ ${element.name} is not visible!`);
      }
    }

    await page.screenshot({ path: 'test-results/exploratory-CT-021-form-elements.png' });
  });

  test('CT-026: Form submission with Enter key', async ({ page }) => {
    console.log('\n=== CT-026: Envio do formulário com tecla Enter ===');

    // Click the register button to switch to registration form
    await page.click('button:has-text("Registrar")');
    await page.waitForTimeout(1000);

    // Fill form with valid data
    const nomeInput = await page.$('input[placeholder="Informe seu Nome"]');
    const emailInput = await page.$('input[placeholder="Informe seu e-mail"]');
    const senhaInput = await page.$('input[placeholder="Informe sua senha"]');
    const confirmarSenhaInput = await page.$('input[placeholder="Informe a confirmação da senha"]');

    await nomeInput.fill('Teste Enter');
    await emailInput.fill('teste.enter@email.com');
    await senhaInput.fill('Senha123!');
    await confirmarSenhaInput.fill('Senha123!');

    // Focus on last field and press Enter
    await confirmarSenhaInput.focus();
    await page.press('input[placeholder="Informe a confirmação da senha"]', 'Enter');

    await page.waitForTimeout(2000);

    // Check for success or error
    let successFound = false;
    let errorFound = false;

    try {
      const successElements = await page.$$('text=/Cadastro realizado com sucesso!/i');
      successFound = successElements.length > 0;

      const pageText = await page.textContent('body');
      if (pageText.includes('Cadastro realizado com sucesso!')) {
        successFound = true;
      }
    } catch (e) {
      console.log('Error checking for success message:', e.message);
    }

    try {
      const errorElements = await page.$$('text=/Este campo é obrigatório/i');
      errorFound = errorElements.length > 0;
    } catch (e) {
      console.log('Error checking for error message:', e.message);
    }

    if (successFound) {
      console.log('✓ Form submitted via Enter key - Success message found');
    } else if (errorFound) {
      const errorElement = await page.$$('text=/Este campo é obrigatório/i')[0];
      const errorText = await errorElement.textContent();
      console.log('✗ Form submitted via Enter key - Validation error:', errorText.trim());
    } else {
      console.log('? Form submitted via Enter key - No clear message');
    }

    await page.screenshot({ path: 'test-results/exploratory-CT-026-enter-submit.png' });
  });
});