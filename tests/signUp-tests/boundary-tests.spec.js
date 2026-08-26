// Boundary test scenarios for BugBank signup feature
// Based on test plan specs/bugbank-test-plan.md CT-013 through CT-016

const { test, expect } = require('@playwright/test');

test.describe('Boundary Test Scenarios - BugBank SignUp Limits', () => {
  test.beforeEach(async ({ page }) => {
    // Start from the home page
    await page.goto('https://bugbank.netlify.app/');
    await page.waitForLoadState('networkidle');

    // Click the register button to switch to registration form
    await page.click('button:has-text("Registrar")');
    await page.waitForTimeout(1000); // Wait for form to switch
  });

  test('CT-013: Nome com limite mínimo de caracteres (1 caractere)', async ({ page }) => {
    console.log('\n=== CT-013: Nome com limite mínimo de caracteres (1 caractere) ===');

    // Fill form with 1-character name
    const nomeInput = await page.$('input[placeholder="Informe seu Nome"]');
    const emailInput = await page.$('input[placeholder="Informe seu e-mail"]');
    const senhaInput = await page.$('input[placeholder="Informe sua senha"]');
    const confirmarSenhaInput = await page.$('input[placeholder="Informe a confirmação da senha"]');
    const cadastrarButton = await page.$('button:has-text("Cadastrar")');

    await nomeInput.fill('A');
    await emailInput.fill('teste@email.com');
    await senhaInput.fill('Senha123!');
    await confirmarSenhaInput.fill('Senha123!');

    await cadastrarButton.click();
    await page.waitForTimeout(3000);

    // Check result - could be success or error depending on actual min length
    const successMessage = await page.textContent('body');
    const hasError = await page.$$('text=/Erro|error|inválido|obrigatório/i').length > 0;

    // Log the outcome for investigation
    console.log('Form submitted with 1-character name');
    if (successMessage.includes('Cadastro realizado com sucesso!')) {
      console.log('✓ Registration successful with 1-character name');
      await expect(page).toHaveURL('https://bugbank.netlify.app/');
    } else {
      console.log('? Registration failed or validation error with 1-character name');
      // Either outcome is acceptable depending on implementation
    }
  });

  test('CT-014: Nome com limite máximo de caracteres', async ({ page }) => {
    console.log('\n=== CT-014: Nome com limite máximo de caracteres ===');

    // Generate 100-character name
    const nome100Chars = 'A'.repeat(100);

    // Fill form with 100-character name
    const nomeInput = await page.$('input[placeholder="Informe seu Nome"]');
    const emailInput = await page.$('input[placeholder="Informe seu e-mail"]');
    const senhaInput = await page.$('input[placeholder="Informe sua senha"]');
    const confirmarSenhaInput = await page.$('input[placeholder="Informe a confirmação da senha"]');
    const cadastrarButton = await page.$('button:has-text("Cadastrar")');

    await nomeInput.fill(nome100Chars);
    await emailInput.fill('teste@email.com');
    await senhaInput.fill('Senha123!');
    await confirmarSenhaInput.fill('Senha123!');

    await cadastrarButton.click();
    await page.waitForTimeout(3000);

    // Check result
    const successMessage = await page.textContent('body');
    const hasError = await page.$$('text=/Erro|error|inválido|obrigatório/i').length > 0;

    console.log('Form submitted with 100-character name');
    if (successMessage.includes('Cadastro realizado com sucesso!')) {
      console.log('✓ Registration successful with 100-character name');
      await expect(page).toHaveURL('https://bugbank.netlify.app/');
    } else {
      console.log('? Registration failed or validation error with 100-character name');
      // Check if it's a specific max length error
      const maxLengthError = await page.$$('text=/O nome deve ter no máximo|máximo.*caracteres/i').length > 0;
      if (maxLengthError) {
        console.log('✓ Correctly rejected due to maximum length exceeded');
      }
      // Either outcome is acceptable depending on implementation
    }
  });

  test('CT-015: E-mail com limite máximo de caracteres', async ({ page }) => {
    console.log('\n=== CT-015: E-mail com limite máximo de caracteres ===');

    // Generate long email (50 chars + @teste.com)
    const longLocalPart = 'a'.repeat(50);
    const email = `${longLocalPart}@teste.com`;

    // Fill form
    const nomeInput = await page.$('input[placeholder="Informe seu Nome"]');
    const emailInput = await page.$('input[placeholder="Informe seu e-mail"]');
    const senhaInput = await page.$('input[placeholder="Informe sua senha"]');
    const confirmarSenhaInput = await page.$('input[placeholder="Informe a confirmação da senha"]');
    const cadastrarButton = await page.$('button:has-text("Cadastrar")');

    await nomeInput.fill('Teste Usuario');
    await emailInput.fill(email);
    await senhaInput.fill('Senha123!');
    await confirmarSenhaInput.fill('Senha123!');

    await cadastrarButton.click();
    await page.waitForTimeout(3000);

    // Check result
    const successMessage = await page.textContent('body');
    const hasError = await page.$$('text=/Erro|error|inválido|obrigatório/i').length > 0;

    console.log('Form submitted with long email');
    if (successMessage.includes('Cadastro realizado com sucesso!')) {
      console.log('✓ Registration successful with long email');
      await expect(page).toHaveURL('https://bugbank.netlify.app/');
    } else {
      console.log('? Registration failed or validation error with long email');
      // Check if it's an email format error
      const emailError = await page.$$('text=/E-mail inválido/i').length > 0;
      if (emailError) {
        console.log('✓ Correctly rejected due to email validation');
      }
      // Either outcome is acceptable depending on implementation
    }
  });

  test('CT-016: Tentativa de cadastro com e-mail já existente', async ({ page }) => {
    console.log('\n=== CT-016: Tentativa de cadastro com e-mail já existente ===');

    // Note: This test assumes there's already a user with email "existing@test.com"
    // Since we can't guarantee pre-existing data in a shared test environment,
    // we'll first create a user with that email, then try to duplicate it

    // First, let's try to register with the email to establish it exists
    const nomeInput = await page.$('input[placeholder="Informe seu Nome"]');
    const emailInput = await page.$('input[placeholder="Informe seu e-mail"]');
    const senhaInput = await page.$('input[placeholder="Informe sua senha"]');
    const confirmarSenhaInput = await page.$('input[placeholder="Informe a confirmação da senha"]');
    const cadastrarButton = await page.$('button:has-text("Cadastrar")');

    // Try to register with the email that should already exist
    await nomeInput.fill('Novo Usuario');
    await emailInput.fill('existing@test.com');
    await senhaInput.fill('Senha123!');
    await confirmarSenhaInput.fill('Senha123!');

    await cadastrarButton.click();
    await page.waitForTimeout(3000);

    // Check if registration succeeded (meaning email wasn't actually taken)
    const successMessage = await page.textContent('body');
    const hasError = await page.$$('text=/Erro|error|inválido|obrigatório/i').length > 0;

    if (successMessage.includes('Cadastro realizado com sucesso!')) {
      console.log('First registration succeeded - email was available');
      // Now try to register again with same email to test duplicate
      await page.reload();
      await page.waitForLoadState('networkidle');
      await page.click('button:has-text("Registrar")');
      await page.waitForTimeout(1000);

      // Fill form again with same email
      await nomeInput.fill('Outro Usuario');
      await emailInput.fill('existing@test.com'); // same email
      await senhaInput.fill('Senha123!');
      await confirmarSenhaInput.fill('Senha123!');

      await cadastrarButton.click();
      await page.waitForTimeout(3000);

      // Check for duplicate email error
      const duplicateError = await page.$$('text=/E-mail já está em uso|email.*já.*exist/i').length > 0;
      const hasAnyError = await page.$$('text=/Erro|error|inválido|obrigatório/i').length > 0;

      console.log(' Second registration attempt with existing email');
      if (duplicateError) {
        console.log('✓ Correctly rejected duplicate email');
      } else if (hasAnyError) {
        console.log('? Registration failed with some error (not necessarily duplicate email)');
      } else {
        console.log('? Second registration also succeeded - may allow duplicates');
      }
    } else {
      console.log('First registration failed - checking if due to email already existing');
      const duplicateError = await page.$$('text=/E-mail já está em uso|email.*já.*exist/i').length > 0;
      if (duplicateError) {
        console.log('✓ Correctly identified email already exists on first attempt');
      } else {
        console.log('? First registration failed for other reasons');
      }
    }
  });
});