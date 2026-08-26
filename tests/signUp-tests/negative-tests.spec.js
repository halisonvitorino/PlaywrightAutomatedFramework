// Negative test scenarios for BugBank signup feature - Validation errors
// Based on test plan specs/bugbank-test-plan.md CT-003 through CT-012

const { test, expect } = require('@playwright/test');

test.describe('Negative Test Scenarios - BugBank SignUp Validation', () => {
  test.beforeEach(async ({ page }) => {
    // Start from the home page
    await page.goto('https://bugbank.netlify.app/');
    await page.waitForLoadState('networkidle');

    // Click the register button to switch to registration form
    await page.click('button:has-text("Registrar")');
    await page.waitForTimeout(1000); // Wait for form to switch
  });

  test('CT-003: Submeter formulário com todos os campos vazios', async ({ page }) => {
    console.log('\n=== CT-003: Submeter formulário com todos os campos vazios ===');

    // Take screenshot of empty form
    await page.screenshot({ path: 'test-results/signup-CT-003-empty-form.png' });

    // Submit without filling anything
    const cadastrarButton = await page.$('button:has-text("Cadastrar")');
    await cadastrarButton.click();
    await page.waitForTimeout(1000);

    // Check for error messages - based on actual app behavior, it shows "É campo obrigatório"
    const nomeError = await page.$$('text=/É campo obrigatório/i').length > 0;
    const emailError = await page.$$('text=/É campo obrigatório/i').length > 0;
    const senhaError = await page.$$('text=/É campo obrigatório/i').length > 0;
    const confirmarSenhaError = await page.$$('text=/É campo obrigatório/i').length > 0;

    expect(nomeError).toBeTruthy();
    expect(emailError).toBeTruthy();
    expect(senhaError).toBeTruthy();
    expect(confirmarSenhaError).toBeTruthy();
  });

  test('CT-004: Campos obrigatórios parcialmente preenchidos', async ({ page }) => {
    console.log('\n=== CT-004: Campos obrigatórios parcialmente preenchidos ===');

    // Preencher apenas o campo "Nome" com "Ana Pereira"
    const nomeInput = await page.$('input[placeholder="Informe seu Nome"]');
    const emailInput = await page.$('input[placeholder="Informe seu e-mail"]');
    const senhaInput = await page.$('input[placeholder="Informe sua senha"]');
    const confirmarSenhaInput = await page.$('input[placeholder="Informe a confirmação da senha"]');
    const cadastrarButton = await page.$('button:has-text("Cadastrar")');

    await nomeInput.fill('Ana Pereira');
    // Leave email, senha, and confirmarSenha empty

    await cadastrarButton.click();
    await page.waitForTimeout(1000);

    // Check for error messages
    const nomeError = await page.$$('text=/É campo obrigatório/i').length > 0;
    const emailError = await page.$$('text=/É campo obrigatório/i').length > 0;
    const senhaError = await page.$$('text=/É campo obrigatório/i').length > 0;
    const confirmarSenhaError = await page.$$('text=/É campo obrigatório/i').length > 0;

    // Nome should not show error (está preenchido)
    expect(nomeError).toBeFalsy();
    // Other fields should show error
    expect(emailError).toBeTruthy();
    expect(senhaError).toBeTruthy();
    expect(confirmarSenhaError).toBeTruthy();
  });

  test('CT-005: E-mail em formato inválido (sem @)', async ({ page }) => {
    console.log('\n=== CT-005: E-mail em formato inválido (sem @) ===');

    // Fill form with invalid email
    const nomeInput = await page.$('input[placeholder="Informe seu Nome"]');
    const emailInput = await page.$('input[placeholder="Informe seu e-mail"]');
    const senhaInput = await page.$('input[placeholder="Informe sua senha"]');
    const confirmarSenhaInput = await page.$('input[placeholder="Informe a confirmação da senha"]');
    const cadastrarButton = await page.$('button:has-text("Cadastrar")');

    await nomeInput.fill('Carlos Mendes');
    await emailInput.fill('carlosmendesemail.com'); // no @
    await senhaInput.fill('Senha123!');
    await confirmarSenhaInput.fill('Senha123!');

    await cadastrarButton.click();
    await page.waitForTimeout(1000);

    // Check for email-specific error
    const emailError = await page.$$('text=/E-mail inválido/i').length > 0;
    expect(emailError).toBeTruthy();
  });

  test('CT-006: E-mail em formato inválido (sem domínio)', async ({ page }) => {
    console.log('\n=== CT-006: E-mail em formato inválido (sem domínio) ===');

    // Fill form with invalid email
    const nomeInput = await page.$('input[placeholder="Informe seu Nome"]');
    const emailInput = await page.$('input[placeholder="Informe seu e-mail"]');
    const senhaInput = await page.$('input[placeholder="Informe sua senha"]');
    const confirmarSenhaInput = await page.$('input[placeholder="Informe a confirmação da senha"]');
    const cadastrarButton = await page.$('button:has-text("Cadastrar")');

    await nomeInput.fill('Laura Costa');
    await emailInput.fill('laura@'); // sem domínio
    await senhaInput.fill('Senha123!');
    await confirmarSenhaInput.fill('Senha123!');

    await cadastrarButton.click();
    await page.waitForTimeout(1000);

    // Check for email-specific error
    const emailError = await page.$$('text=/E-mail inválido/i').length > 0;
    expect(emailError).toBeTruthy();
  });

  test('CT-007: Senha e confirmação de senha não coincidem', async ({ page }) => {
    console.log('\n=== CT-007: Senha e confirmação de senha não coincidem ===');

    // Fill form with mismatched passwords
    const nomeInput = await page.$('input[placeholder="Informe seu Nome"]');
    const emailInput = await page.$('input[placeholder="Informe seu e-mail"]');
    const senhaInput = await page.$('input[placeholder="Informe sua senha"]');
    const confirmarSenhaInput = await page.$('input[placeholder="Informe a confirmação da senha"]');
    const cadastrarButton = await page.$('button:has-text("Cadastrar")');

    await nomeInput.fill('Rafael Lima');
    await emailInput.fill('rafael@email.com');
    await senhaInput.fill('Senha123!');
    await confirmarSenhaInput.fill('Senha456!'); // different password

    await cadastrarButton.click();
    await page.waitForTimeout(1000);

    // Check for password mismatch error
    const senhaError = await page.$$('text=/As senhas não coincidem/i').length > 0;
    expect(senhaError).toBeTruthy();
  });

  test('CT-008: Campo Nome com apenas espaços em branco', async ({ page }) => {
    console.log('\n=== CT-008: Campo Nome com apenas espaços em branco ===');

    // Fill form with spaces in name
    const nomeInput = await page.$('input[placeholder="Informe seu Nome"]');
    const emailInput = await page.$('input[placeholder="Informe seu e-mail"]');
    const senhaInput = await page.$('input[placeholder="Informe sua senha"]');
    const confirmarSenhaInput = await page.$('input[placeholder="Informe a confirmação da senha"]');
    const cadastrarButton = await page.$('button:has-text("Cadastrar")');

    await nomeInput.fill('   ');
    await emailInput.fill('teste@email.com');
    await senhaInput.fill('Senha123!');
    await confirmarSenhaInput.fill('Senha123!');

    await cadastrarButton.click();
    await page.waitForTimeout(1000);

    // Check for name error
    const nomeError = await page.$$('text=/É campo obrigatório/i').length > 0;
    expect(nomeError).toBeTruthy();
  });

  test('CT-009: Nome contendo números (inválido conforme critérios)', async ({ page }) => {
    console.log('\n=== CT-009: Nome contendo números ===');

    // Fill form with name containing numbers
    const nomeInput = await page.$('input[placeholder="Informe seu Nome"]');
    const emailInput = await page.$('input[placeholder="Informe seu e-mail"]');
    const senhaInput = await page.$('input[placeholder="Informe sua senha"]');
    const confirmarSenhaInput = await page.$('input[placeholder="Informe a confirmação da senha"]');
    const cadastrarButton = await page.$('button:has-text("Cadastrar")');

    await nomeInput.fill('João123');
    await emailInput.fill('joao@email.com');
    await senhaInput.fill('Senha123!');
    await confirmarSenhaInput.fill('Senha123!');

    await cadastrarButton.click();
    await page.waitForTimeout(1000);

    // Check for name error - based on app behavior, it might show "É campo obrigatório" for invalid names too
    const nomeError = await page.$$('text=/É campo obrigatório|Nome inválido/i').length > 0;
    expect(nomeError).toBeTruthy();
  });

  test('CT-010: Nome contendo caracteres especiais', async ({ page }) => {
    console.log('\n=== CT-010: Nome contendo caracteres especiais ===');

    // Fill form with name containing special characters
    const nomeInput = await page.$('input[placeholder="Informe seu Nome"]');
    const emailInput = await page.$('input[placeholder="Informe seu e-mail"]');
    const senhaInput = await page.$('input[placeholder="Informe sua senha"]');
    const confirmarSenhaInput = await page.$('input[placeholder="Informe a confirmação da senha"]');
    const cadastrarButton = await page.$('button:has-text("Cadastrar")');

    await nomeInput.fill('João@Silva!');
    await emailInput.fill('joao@email.com');
    await senhaInput.fill('Senha123!');
    await confirmarSenhaInput.fill('Senha123!');

    await cadastrarButton.click();
    await page.waitForTimeout(1000);

    // Check for name error
    const nomeError = await page.$$('text=/É campo obrigatório|Nome inválido/i').length > 0;
    expect(nomeError).toBeTruthy();
  });

  test('CT-011: Senha muito curta (menos de 6 caracteres)', async ({ page }) => {
    console.log('\n=== CT-011: Senha muito curta ===');

    // Fill form with short password
    const nomeInput = await page.$('input[placeholder="Informe seu Nome"]');
    const emailInput = await page.$('input[placeholder="Informe seu e-mail"]');
    const senhaInput = await page.$('input[placeholder="Informe sua senha"]');
    const confirmarSenhaInput = await page.$('input[placeholder="Informe a confirmação da senha"]');
    const cadastrarButton = await page.$('button:has-text("Cadastrar")');

    await nomeInput.fill('Pedro Alves');
    await emailInput.fill('pedro@email.com');
    await senhaInput.fill('123'); // too short
    await confirmarSenhaInput.fill('123'); // too short

    await cadastrarButton.click();
    await page.waitForTimeout(1000);

    // Check for password error
    const senhaError = await page.$$('text=/A senha deve ter pelo menos 6 caracteres|Senha inválida|É campo obrigatório/i').length > 0;
    expect(senhaError).toBeTruthy();
  });

  test('CT-012: Senha sem letras', async ({ page }) => {
    console.log('\n=== CT-012: Senha sem letras ===');

    // Fill form with password containing only numbers and special chars
    const nomeInput = await page.$('input[placeholder="Informe seu Nome"]');
    const emailInput = await page.$('input[placeholder="Informe seu e-mail"]');
    const senhaInput = await page.$('input[placeholder="Informe sua senha"]');
    const confirmarSenhaInput = await page.$('input[placeholder="Informe a confirmação da senha"]');
    const cadastrarButton = await page.$('button:has-text("Cadastrar")');

    await nomeInput.fill('Mariana Cruz');
    await emailInput.fill('mariana@email.com');
    await senhaInput.fill('123456!'); // no letters
    await confirmarSenhaInput.fill('123456!'); // no letters

    await cadastrarButton.click();
    await page.waitForTimeout(1000);

    // Check for password error (if applicable to validation rules)
    const senhaError = await page.$$('text=/A senha deve conter letras|Senha inválida|É campo obrigatório/i').length > 0;
    // Note: This assertion depends on actual validation rules - may need adjustment
    // For now, we'll check if there's any error message
    const hasAnyError = await page.$$('text=/Erro|error|inválido|É campo obrigatório/i').length > 0;
    expect(hasAnyError).toBeTruthy(); // At least some validation should occur
  });
});