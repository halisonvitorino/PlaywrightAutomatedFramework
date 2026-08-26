import { test, expect } from '@playwright/test';

test.use({
  baseURL: 'https://bugbank.netlify.app',
});

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('TC01: Cadastro com Dados Válidos (Fluxo Feliz)', async ({ page }) => {
  // Click on Register link/button to show the register form
  await page.click('button:has-text("Registrar")');
  // Wait for the register form to become visible
  const registerForm = page.locator('.card__register');
  await expect(registerForm).toBeVisible();
  // Fill form with valid data
  const timestamp = Date.now();
  const email = `maria.silva${timestamp}@email.com`;
  await registerForm.locator('input[placeholder="Informe seu Nome"]').fill('Maria Silva');
  await registerForm.locator('input[placeholder="Informe seu e-mail"]').fill(email);
  await registerForm.locator('input[placeholder="Informe sua senha"]').fill('Senha@123');
  await registerForm.locator('input[placeholder="Informe a confirmação da senha"]').fill('Senha@123');
  // Click Cadastrar button
  await registerForm.locator('button:has-text("Cadastrar")').click();
  // Wait for success message or redirect
  // Look for success message - the actual message shown is "A conta [...] foi criada com sucesso"
  const successMessage = page.locator('text=foi criada com sucesso');
  await expect(successMessage).toBeVisible({ timeout: 5000 });
  // Alternatively, check if redirected to login page (maybe after success it goes back to login)
  await expect(page).toHaveURL(/login|welcome|home/i, { timeout: 5000 });
});

test('TC02: Campos Obrigatórios Vazios', async ({ page }) => {
  await page.click('button:has-text("Registrar")');
  const registerForm = page.locator('.card__register');
  await expect(registerForm).toBeVisible();
  // Leave all fields empty and submit
  await registerForm.locator('button:has-text("Cadastrar")').click();
  // Check for error messages within the register form only
  const nomeError = registerForm.locator('input[placeholder="Informe seu Nome"] + .input__warging');
  const emailError = registerForm.locator('input[placeholder="Informe seu e-mail"] + .input__warging');
  const senhaError = registerForm.locator('input[placeholder="Informe sua senha"] + .input__warging');
  const confirmarSenhaError = registerForm.locator('input[placeholder="Informe a confirmação da senha"] + .input__warging');
  // Expect at least one error visible (should be all required fields)
  await expect(nomeError).toBeVisible({ timeout: 5000 });
  await expect(emailError).toBeVisible({ timeout: 5000 });
  await expect(senhaError).toBeVisible({ timeout: 5000 });
  await expect(confirmarSenhaError).toBeVisible({ timeout: 5000 });
  // Check that error messages contain expected text
  await expect(nomeError).toHaveText('É campo obrigatório');
  await expect(emailError).toHaveText('É campo obrigatório');
  await expect(senhaError).toHaveText('É campo obrigatório');
  await expect(confirmarSenhaError).toHaveText('É campo obrigatório');
  // Still on register page
  await expect(registerForm).toBeVisible();
});

test('TC03: E-mail Inválido (Sem @)', async ({ page }) => {
  await page.click('button:has-text("Registrar")');
  const registerForm = page.locator('.card__register');
  await expect(registerForm).toBeVisible();
  await registerForm.locator('input[placeholder="Informe seu Nome"]').fill('João Silva');
  await registerForm.locator('input[placeholder="Informe seu e-mail"]').fill('joaosilvaemail.com'); // sem @
  await registerForm.locator('input[placeholder="Informe sua senha"]').fill('Senha@123');
  await registerForm.locator('input[placeholder="Informe a confirmação da senha"]').fill('Senha@123');
  await registerForm.locator('button:has-text("Cadastrar")').click();
  // Expect error for email field
  const emailError = registerForm.locator('input[placeholder="Informe seu e-mail"] + .input__warging');
  await expect(emailError).toBeVisible({ timeout: 5000 });
  await expect(emailError).toHaveText('Formato inválido');
  // Ensure other fields remain filled and have no error
  await expect(registerForm.locator('input[placeholder="Informe seu Nome"]')).toHaveValue('João Silva');
  await expect(registerForm.locator('input[placeholder="Informe sua senha"]')).toHaveValue('Senha@123');
  await expect(registerForm.locator('input[placeholder="Informe a confirmação da senha"]')).toHaveValue('Senha@123');
  // Check that other fields don't have error messages
  const nomeError = registerForm.locator('input[placeholder="Informe seu Nome"] + .input__warging');
  const senhaError = registerForm.locator('input[placeholder="Informe sua senha"] + .input__warging');
  const confirmarSenhaError = registerForm.locator('input[placeholder="Informe a confirmação da senha"] + .input__warging');
  await expect(nomeError).toHaveText('');
  await expect(senhaError).toHaveText('');
  await expect(confirmarSenhaError).toHaveText('');
  // Still on register page
  await expect(registerForm).toBeVisible();
});

test('TC04: Campos com Apenas Espaços em Branco', async ({ page }) => {
  await page.click('button:has-text("Registrar")');
  const registerForm = page.locator('.card__register');
  await expect(registerForm).toBeVisible();
  await registerForm.locator('input[placeholder="Informe seu Nome"]').fill('   ');
  await registerForm.locator('input[placeholder="Informe seu e-mail"]').fill('joao@email.com');
  await registerForm.locator('input[placeholder="Informe sua senha"]').fill('Senha@123');
  await registerForm.locator('input[placeholder="Informe a confirmação da senha"]').fill('Senha@123');
  await registerForm.locator('button:has-text("Cadastrar")').click();
  const nomeError = registerForm.locator('input[placeholder="Informe seu Nome"] + .input__warging');
  await expect(nomeError).toBeVisible({ timeout: 5000 });
  await expect(nomeError).toHaveText('É campo obrigatório');
  // Other fields should be OK
  await expect(registerForm.locator('input[placeholder="Informe seu e-mail"] + .input__warging')).toHaveText('');
  await expect(registerForm.locator('input[placeholder="Informe sua senha"] + .input__warging')).toHaveText('');
  await expect(registerForm.locator('input[placeholder="Informe a confirmação da senha"] + .input__warging')).toHaveText('');
  await expect(registerForm).toBeVisible();
});

test('TC05: Nome com Caracteres Especiais ou Números', async ({ page }) => {
  await page.click('button:has-text("Registrar")');
  const registerForm = page.locator('.card__register');
  await expect(registerForm).toBeVisible();
  await registerForm.locator('input[placeholder="Informe seu Nome"]').fill('João123!');
  await registerForm.locator('input[placeholder="Informe seu e-mail"]').fill('joao@email.com');
  await registerForm.locator('input[placeholder="Informe sua senha"]').fill('Senha@123');
  await registerForm.locator('input[placeholder="Informe a confirmação da senha"]').fill('Senha@123');
  await registerForm.locator('button:has-text("Cadastrar")').click();
  const nomeError = registerForm.locator('input[placeholder="Informe seu Nome"] + .input__warging');
  await expect(nomeError).toBeVisible({ timeout: 5000 });
  // Based on the error we saw in TC02, it seems the validation might be "É campo obrigatório" for invalid chars too
  // Let's check what the actual error is
  const nomeErrorText = await nomeError.textContent();
  // If it's not empty, it's showing an error
  await expect(nomeErrorText.length > 0).toBeTruthy();
  // Other fields should be OK
  await expect(registerForm.locator('input[placeholder="Informe seu e-mail"] + .input__warging')).toHaveText('');
  await expect(registerForm.locator('input[placeholder="Informe sua senha"] + .input__warging')).toHaveText('');
  await expect(registerForm.locator('input[placeholder="Informe a confirmação da senha"] + .input__warging')).toHaveText('');
  await expect(registerForm).toBeVisible();
});

test('TC06: Exceder Limite de Caracteres no Nome', async ({ page }) => {
  await page.click('button:has-text("Registrar")');
  const registerForm = page.locator('.card__register');
  await expect(registerForm).toBeVisible();
  const longName = 'a'.repeat(300);
  await registerForm.locator('input[placeholder="Informe seu Nome"]').fill(longName);
  await registerForm.locator('input[placeholder="Informe seu e-mail"]').fill('test@email.com');
  await registerForm.locator('input[placeholder="Informe sua senha"]').fill('Senha@123');
  await registerForm.locator('input[placeholder="Informe a confirmação da senha"]').fill('Senha@123');
  await registerForm.locator('button:has-text("Cadastrar")').click();
  const nomeError = registerForm.locator('input[placeholder="Informe seu Nome"] + .input__warging');
  await expect(nomeError).toBeVisible({ timeout: 5000 });
  const nomeErrorText = await nomeError.textContent();
  await expect(nomeErrorText.length > 0).toBeTruthy();
  // Other fields should be OK
  await expect(registerForm.locator('input[placeholder="Informe seu e-mail"] + .input__warging')).toHaveText('');
  await expect(registerForm.locator('input[placeholder="Informe sua senha"] + .input__warging')).toHaveText('');
  await expect(registerForm.locator('input[placeholder="Informe a confirmação da senha"] + .input__warging')).toHaveText('');
  await expect(registerForm).toBeVisible();
});

test('TC07: E-mail Duplicado (Cenário Adicional)', async ({ page }) => {
  await page.click('button:has-text("Registrar")');
  const registerForm = page.locator('.card__register');
  await expect(registerForm).toBeVisible();
  await registerForm.locator('input[placeholder="Informe seu Nome"]').fill('Usuario Existente');
  await registerForm.locator('input[placeholder="Informe seu e-mail"]').fill('existente@email.com'); // assume already exists
  await registerForm.locator('input[placeholder="Informe sua senha"]').fill('Senha@123');
  await registerForm.locator('input[placeholder="Informe a confirmação da senha"]').fill('Senha@123');
  await registerForm.locator('button:has-text("Cadastrar")').click();
  const emailError = registerForm.locator('input[placeholder="Informe seu e-mail"] + .input__warging');
  await expect(emailError).toBeVisible({ timeout: 5000 });
  const emailErrorText = await emailError.textContent();
  await expect(emailErrorText.length > 0).toBeTruthy();
  // Other fields should be OK
  await expect(registerForm.locator('input[placeholder="Informe seu Nome"] + .input__warging')).toHaveText('');
  await expect(registerForm.locator('input[placeholder="Informe sua senha"] + .input__warging')).toHaveText('');
  await expect(registerForm.locator('input[placeholder="Informe a confirmação da senha"] + .input__warging')).toHaveText('');
  await expect(registerForm).toBeVisible();
});

test('TC08: Navegação da Página Inicial para a Página de Cadastro', async ({ page }) => {
  await page.goto('/');
  await page.click('button:has-text("Registrar")');
  // Check that the register form becomes visible
  const registerForm = page.locator('.card__register');
  await expect(registerForm).toBeVisible();
  // Check that form fields are visible within the register form
  await expect(registerForm.locator('input[placeholder="Informe seu Nome"]')).toBeVisible();
  await expect(registerForm.locator('input[placeholder="Informe seu e-mail"]')).toBeVisible();
  await expect(registerForm.locator('input[placeholder="Informe sua senha"]')).toBeVisible();
  await expect(registerForm.locator('input[placeholder="Informe a confirmação da senha"]')).toBeVisible();
  await expect(registerForm.locator('button:has-text("Cadastrar")')).toBeVisible();
});

test('TC09: Validação de Elementos da UI na Página de Cadastro', async ({ page }) => {
  await page.click('button:has-text("Registrar")');
  const registerForm = page.locator('.card__register');
  await expect(registerForm).toBeVisible();
  // Check for title indicative of registration page within the register form or nearby
  // Looking at the HTML, there's a "Voltar ao login" link and the form itself
  // Let's check for elements that indicate we're on the registration page
  await expect(registerForm.locator('text=Voltar ao login')).toBeVisible();
  await expect(registerForm.locator('text=Criar conta com saldo ?')).toBeVisible();
  // Check input fields
  await expect(registerForm.locator('input[placeholder="Informe seu Nome"]')).toHaveAttribute('type', 'text');
  await expect(registerForm.locator('input[placeholder="Informe seu e-mail"]')).toHaveAttribute('type', 'email');
  await expect(registerForm.locator('input[placeholder="Informe sua senha"]')).toHaveAttribute('type', 'password');
  await expect(registerForm.locator('input[placeholder="Informe a confirmação da senha"]')).toHaveAttribute('type', 'password');
  // Check placeholders
  await expect(registerForm.locator('input[placeholder="Informe seu Nome"]')).toHaveAttribute('placeholder', 'Informe seu Nome');
  await expect(registerForm.locator('input[placeholder="Informe seu e-mail"]')).toHaveAttribute('placeholder', 'Informe seu e-mail');
  await expect(registerForm.locator('input[placeholder="Informe sua senha"]')).toHaveAttribute('placeholder', 'Informe sua senha');
  await expect(registerForm.locator('input[placeholder="Informe a confirmação da senha"]')).toHaveAttribute('placeholder', 'Informe a confirmação da senha');
  // Check button
  await expect(registerForm.locator('button:has-text("Cadastrar")')).toBeEnabled();
});