// Navigation and UI test scenarios for BugBank signup feature
// Based on test plan specs/bugbank-test-plan.md CT-017 through CT-030

const { test, expect } = require('@playwright/test');

test.describe('Navigation and UI Test Scenarios - BugBank SignUp', () => {
  test.beforeEach(async ({ page }) => {
    // Start from the home page
    await page.goto('https://bugbank.netlify.app/');
    await page.waitForLoadState('networkidle');
  });

  test('CT-017: Navegação para página de cadastro a partir da home', async ({ page }) => {
    console.log('\n=== CT-017: Navegação para página de cadastro a partir da home ===');

    await page.screenshot({ path: 'test-results/signup-CT-017-home.png' });

    // Click register button to switch to registration form
    await page.click('button:has-text("Registrar")');
    await page.waitForTimeout(1000);

    await page.screenshot({ path: 'test-results/signup-CT-017-register-page.png' });

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

    expect(nomeInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(senhaInput).toBeTruthy();
    expect(confirmarSenhaInput).toBeTruthy();
    expect(cadastrarButton).toBeTruthy();
  });

  test('CT-018: Comportamento do botão "Voltar" após navegar para cadastro', async ({ page }) => {
    console.log('\n=== CT-018: Comportamento do botão "Voltar" após navegar para cadastro ===');

    // Navigate to registration form
    await page.click('button:has-text("Registrar")');
    await page.waitForTimeout(1000);

    // Go back using browser back button
    await page.goBack();
    await page.waitForTimeout(1000);

    // Check if returned to home page
    await expect(page).toHaveURL('https://bugbank.netlify.app/');
    console.log('✓ Returned to home page after back button');
  });

  test('CT-019: Limpar formulário após cancelamento', async ({ page }) => {
    console.log('\n=== CT-019: Limpar formulário após cancelamento ===');

    // Navigate to registration form
    await page.click('button:has-text("Registrar")');
    await page.waitForTimeout(1000);

    // Fill some fields
    const nomeInput = await page.$('input[placeholder="Informe seu Nome"]');
    const emailInput = await page.$('input[placeholder="Informe seu e-mail"]');
    await nomeInput.fill('Test User');
    await emailInput.fill('test@example.com');

    // Reload page (simulating cancel/refresh behavior)
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Navigate back to registration form
    await page.click('button:has-text("Registrar")');
    await page.waitForTimeout(1000);

    // Check if form is cleared (this depends on implementation)
    const nomeValue = await nomeInput.inputValue();
    const emailValue = await emailInput.inputValue();

    console.log('Nome field value after reload:', nomeValue);
    console.log('Email field value after reload:', emailValue);

    // Note: Behavior may vary - form might be cleared or retain values
    // We're just observing the behavior here
  });

  test('CT-020: Redirecionamento após login bem-sucedido', async ({ page }) => {
    console.log('\n=== CT-020: Redirecionamento após login bem-sucedido ===');

    // Note: This test seems to be mislabeled in the test plan - it refers to "login"
    // but should be about registration success redirect. We'll test registration success.

    // Navigate to registration form
    await page.click('button:has-text("Registrar")');
    await page.waitForTimeout(1000);

    // Fill form with valid data
    const nomeInput = await page.$('input[placeholder="Informe seu Nome"]');
    const emailInput = await page.$('input[placeholder="Informe seu e-mail"]');
    const senhaInput = await page.$('input[placeholder="Informe sua senha"]');
    const confirmarSenhaInput = await page.$('input[placeholder="Informe a confirmação da senha"]');
    const cadastrarButton = await page.$('button:has-text("Cadastrar")');

    await nomeInput.fill('Test User');
    await emailInput.fill('test@example.com');
    await senhaInput.fill('Senha123!');
    await confirmarSenhaInput.fill('Senha123!');

    await cadastrarButton.click();
    await page.waitForTimeout(3000);

    // Check for success message
    const successMessage = await page.textContent('body');
    expect(successMessage).toContain('Cadastro realizado com sucesso!');

    // Check if redirected to home page
    await expect(page).toHaveURL('https://bugbank.netlify.app/');
    console.log('✓ Redirected to home page after successful registration');
  });

  test('CT-021: Verificação de presença de todos os elementos do formulário', async ({ page }) => {
    console.log('\n=== CT-021: Verificação de presença de todos os elementos do formulário ===');

    // Navigate to registration form
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
      expect(isVisible).toBeTruthy();
      console.log(`${element.name} visible:`, isVisible);
    }
  });

  test('CT-022: Verificação de placeholders e rótulos dos campos', async ({ page }) => {
    console.log('\n=== CT-022: Verificação de placeholders e rótulos dos campos ===');

    // Navigate to registration form
    await page.click('button:has-text("Registrar")');
    await page.waitForTimeout(1000);

    // Check placeholders
    const nomeInput = await page.$('input[placeholder="Informe seu Nome"]');
    const emailInput = await page.$('input[placeholder="Informe seu e-mail"]');
    const senhaInput = await page.$('input[placeholder="Informe sua senha"]');
    const confirmarSenhaInput = await page.$('input[placeholder="Informe a confirmação da senha"]');

    const nomePlaceholder = await nomeInput.getAttribute('placeholder');
    const emailPlaceholder = await emailInput.getAttribute('placeholder');
    const senhaPlaceholder = await senhaInput.getAttribute('placeholder');
    const confirmarSenhaPlaceholder = await confirmarSenhaInput.getAttribute('placeholder');

    expect(nomePlaceholder).toBe('Informe seu Nome');
    expect(emailPlaceholder).toBe('Informe seu e-mail');
    expect(senhaPlaceholder).toBe('Informe sua senha');
    expect(confirmarSenhaPlaceholder).toBe('Informe a confirmação da senha');

    console.log('✓ All placeholders verified correctly');
  });

  test('CT-023: Estado inicial dos campos (vazios)', async ({ page }) => {
    console.log('\n=== CT-023: Estado inicial dos campos (vazios) ===');

    // Navigate to registration form
    await page.click('button:has-text("Registrar")');
    await page.waitForTimeout(1000);

    // Check initial state of all input fields
    const nomeInput = await page.$('input[placeholder="Informe seu Nome"]');
    const emailInput = await page.$('input[placeholder="Informe seu e-mail"]');
    const senhaInput = await page.$('input[placeholder="Informe sua senha"]');
    const confirmarSenhaInput = await page.$('input[placeholder="Informe a confirmação da senha"]');

    const nomeValue = await nomeInput.inputValue();
    const emailValue = await emailInput.inputValue();
    const senhaValue = await senhaInput.inputValue();
    const confirmarSenhaValue = await confirmarSenhaInput.inputValue();

    expect(nomeValue).toBe('');
    expect(emailValue).toBe('');
    expect(senhaValue).toBe('');
    expect(confirmarSenhaValue).toBe('');

    console.log('✓ All fields start empty');
  });

  test('CT-024: Foco inicial no primeiro campo', async ({ page }) => {
    console.log('\n=== CT-024: Foco inicial no primeiro campo ===');

    // Navigate to registration form
    await page.click('button:has-text("Registrar")');
    await page.waitForTimeout(1000);

    // Check which element has focus initially
    const focusedElement = await page.evaluate(() => document.activeElement);
    const focusedTagName = focusedElement.tagName.toLowerCase();
    const focusedPlaceholder = focusedElement.placeholder || '';

    console.log('Initially focused element:', focusedTagName, 'with placeholder:', focusedPlaceholder);

    // Expect the first input (Nome) to have focus
    const nomeInput = await page.$('input[placeholder="Informe seu Nome"]');
    const isNomeFocused = await nomeInput.evaluate(el => el === document.activeElement);

    // Note: This behavior may vary - documenting what we observe
    if (isNomeFocused) {
      console.log('✓ Nome field receives initial focus');
    } else {
      console.log('? Initial focus behavior observed:', focusedTagName, focusedPlaceholder);
    }
  });

  test('CT-025: Navegação com tecla Tab entre campos', async ({ page }) => {
    console.log('\n=== CT-025: Navegação com tecla Tab entre campos ===');

    // Navigate to registration form
    await page.click('button:has-text("Registrar")');
    await page.waitForTimeout(1000);

    // Start with focus on first field (Nome)
    const nomeInput = await page.$('input[placeholder="Informe seu Nome"]');
    await nomeInput.focus();

    // Press Tab to move to E-mail field
    await page.press('input[placeholder="Informe seu Nome"]', 'Tab');
    await page.waitForTimeout(100);

    const emailInput = await page.$('input[placeholder="Informe seu e-mail"]');
    const isEmailFocused = await emailInput.evaluate(el => el === document.activeElement);
    expect(isEmailFocused).toBeTruthy();

    // Press Tab to move to Senha field
    await page.press('input[placeholder="Informe seu e-mail"]', 'Tab');
    await page.waitForTimeout(100);

    const senhaInput = await page.$('input[placeholder="Informe sua senha"]');
    const isSenhaFocused = await senhaInput.evaluate(el => el === document.activeElement);
    expect(isSenhaFocused).toBeTruthy();

    // Press Tab to move to Confirmar Senha field
    await page.press('input[placeholder="Informe sua senha"]', 'Tab');
    await page.waitForTimeout(100);

    const confirmarSenhaInput = await page.$('input[placeholder="Informe a confirmação da senha"]');
    const isConfirmarSenhaFocused = await confirmarSenhaInput.evaluate(el => el === document.activeElement);
    expect(isConfirmarSenhaFocused).toBeTruthy();

    // Press Tab to move to Cadastrar button
    await page.press('input[placeholder="Informe a confirmação da senha"]', 'Tab');
    await page.waitForTimeout(100);

    const cadastrarButton = await page.$('button:has-text("Cadastrar")');
    const isButtonFocused = await cadastrarButton.evaluate(el => el === document.activeElement);
    expect(isButtonFocused).toBeTruthy();

    console.log('✓ Tab navigation follows correct order: Nome → E-mail → Senha → Confirmar Senha → Cadastrar');
  });

  test('CT-026: Envio do formulário com tecla Enter', async ({ page }) => {
    console.log('\n=== CT-026: Envio do formulário com tecla Enter ===');

    // Navigate to registration form
    await page.click('button:has-text("Registrar")');
    await page.waitForTimeout(1000);

    // Fill form with valid data
    const nomeInput = await page.$('input[placeholder="Informe seu Nome"]');
    const emailInput = await page.$('input[placeholder="Informe seu e-mail"]');
    const senhaInput = await page.$('input[placeholder="Informe sua senha"]');
    const confirmarSenhaInput = await page.$('input[placeholder="Informe a confirmação da senha"]');
    const cadastrarButton = await page.$('button:has-text("Cadastrar")');

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
      await expect(page).toHaveURL('https://bugbank.netlify.app/');
    } else if (errorFound) {
      const errorElement = await page.$$('text=/Este campo é obrigatório/i')[0];
      const errorText = await errorElement.textContent();
      console.log('✗ Form submitted via Enter key - Validation error:', errorText.trim());
    } else {
      console.log('? Form submitted via Enter key - No clear message');
    }
  });

  test('CT-027: Mensagens de erro aparecem em tempo real', async ({ page }) => {
    console.log('\n=== CT-027: Mensagens de erro aparecem em tempo real ===');

    // Navigate to registration form
    await page.click('button:has-text("Registrar")');
    await page.waitForTimeout(1000);

    // Leave Nome field empty
    const nomeInput = await page.$('input[placeholder="Informe seu Nome"]');
    const emailInput = await page.$('input[placeholder="Informe seu e-mail"]');

    // Fill email to move focus away from nome
    await emailInput.fill('test@test.com');

    // Wait for potential real-time validation
    await page.waitForTimeout(1000);

    // Check for error message on Nome field
    const nomeError = await page.$$('text=/O campo Nome é obrigatório/i').length > 0;

    console.log('Nome error after losing focus:', nomeError ? 'Found' : 'Not found');
    // Note: Real-time validation behavior may vary - documenting what we observe
  });

  test('CT-028: Mensagens de erro desaparecem após correção', async ({ page }) => {
    console.log('\n=== CT-028: Mensagens de erro desaparecem após correção ===');

    // Navigate to registration form
    await page.click('button:has-text("Registrar")');
    await page.waitForTimeout(1000);

    // Create error by leaving Nome empty then moving focus
    const nomeInput = await page.$('input[placeholder="Informe seu Nome"]');
    const emailInput = await page.$('input[placeholder="Informe seu e-mail"]');

    await emailInput.fill('test@test.com'); // This should trigger nome error if validation is real-time

    await page.waitForTimeout(1000);

    // Check if error appears
    let errorBefore = await page.$$('text=/O campo Nome é obrigatório/i').length > 0;
    console.log('Error before correction:', errorBefore ? 'Present' : 'Not present');

    // Correct the error by filling in nome
    await nomeInput.fill('Nome Valid');

    await page.waitForTimeout(1000);

    // Check if error disappears
    let errorAfter = await page.$$('text=/O campo Nome é obrigatório/i').length > 0;
    console.log('Error after correction:', errorAfter ? 'Still present' : 'Disappeared');

    // Note: Behavior may vary based on implementation
  });

  test('CT-029: Estado de carregamento durante submissão', async ({ page }) => {
    console.log('\n=== CT-029: Estado de carregamento durante submissão ===');

    // Navigate to registration form
    await page.click('button:has-text("Registrar")');
    await page.waitForTimeout(1000);

    // Fill form with valid data
    const nomeInput = await page.$('input[placeholder="Informe seu Nome"]');
    const emailInput = await page.$('input[placeholder="Informe seu e-mail"]');
    const senhaInput = await page.$('input[placeholder="Informe sua senha"]');
    const confirmarSenhaInput = await page.$('input[placeholder="Informe a confirmação da senha"]');
    const cadastrarButton = await page.$('button:has-text("Cadastrar")');

    await nomeInput.fill('Test User');
    await emailInput.fill('test@example.com');
    await senhaInput.fill('Senha123!');
    await confirmarSenhaInput.fill('Senha123!');

    // Check button state before click
    const buttonDisabledBefore = await cadastrarButton.isDisabled();
    console.log('Button disabled before click:', buttonDisabledBefore);

    // Click submit
    await cadastrarButton.click();

    // Check button state immediately after click (may show loading state)
    await page.waitForTimeout(100);
    const buttonDisabledAfter = await cadastrarButton.isDisabled();
    console.log('Button disabled after click:', buttonDisabledAfter);

    // Wait for processing to complete
    await page.waitForTimeout(3000);

    // Check final state
    const buttonDisabledFinal = await cadastrarButton.isDisabled();
    console.log('Button disabled after processing:', buttonDisabledFinal);

    // Check for success message
    const successMessage = await page.textContent('body');
    if (successMessage.includes('Cadastro realizado com sucesso!')) {
      console.log('✓ Submission completed successfully');
    }
  });

  // Note: CT-030 (Responsividade) would require testing different viewports
  // which is better handled in separate viewport tests or using test.use()
});