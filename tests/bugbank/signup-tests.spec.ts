import { test, expect } from '@playwright/test';

test.use({
  baseURL: 'https://bugbank.netlify.app',
});

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  // Wait for the page to be ready by waiting for a known element
  await expect(page.locator('h1')).toBeVisible();
});

/**
 * TC01: Cadastro com Dados Válidos (Fluxo Feliz)
 */
test('TC01: Cadastro de usuário com dados válidos', async ({ page }) => {
  // Click on Register link to show the register form
  const registerLink = page.locator('#show-register');
  await expect(registerLink).toBeVisible({ timeout: 5000 });
  await registerLink.click();
  // Wait for the register form to become visible
  const registerForm = page.locator('#register-form');
  await expect(registerForm).toBeVisible({ timeout: 5000 });
  // Fill form with valid data
  const timestamp = Date.now();
  const email = `maria.silva${timestamp}@email.com`;
  await registerForm.locator('input[name="reg-email"]').fill(email);
  await registerForm.locator('input[name="name"]').fill('Maria Silva');
  await registerForm.locator('input[name="reg-pass"]').fill('Senha@123');
  await registerForm.locator('input[name="reg-conf-pass"]').fill('Senha@123');
  // Click Cadastrar button
  await registerForm.locator('button[type="submit"]:has-text("Cadastrar")').click();
  // Wait for success message - the actual message shown is "A conta [...] foi criada com sucesso"
  const successMessage = page.locator('text=foi criada com sucesso');
  await expect(successMessage).toBeVisible({ timeout: 5000 });
  // After success, we might stay on the same page or go to login - check for success message is enough
});

/**
 * TC02: Campos Obrigatórios Vazios
 */
test('TC02: Submissão do formulário com todos os campos obrigatórios vazios', async ({ page }) => {
  const registerLink = page.locator('#show-register');
  await expect(registerLink).toBeVisible({ timeout: 5000 });
  await registerLink.click();
  const registerForm = page.locator('#register-form');
  await expect(registerForm).toBeVisible({ timeout: 5000 });
  // Leave all fields empty and submit
  await registerForm.locator('button[type="submit"]:has-text("Cadastrar")').click();
  // Check for error messages within the register form only
  const nomeError = registerForm.locator('input[name="name"] + .input__warging');
  const emailError = registerForm.locator('input[name="reg-email"] + .input__warging');
  const senhaError = registerForm.locator('input[name="reg-pass"] + .input__warging');
  const confirmarSenhaError = registerForm.locator('input[name="reg-conf-pass"] + .input__warging');
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
  await expect(registerForm).toBeVisible({ timeout: 5000 });
});

/**
 * TC03: E-mail Inválido (Sem @)
 */
test('TC03: Tentativa de cadastro com e-mail no formato inválido (sem @)', async ({ page }) => {
  const registerLink = page.locator('#show-register');
  await expect(registerLink).toBeVisible({ timeout: 5000 });
  await registerLink.click();
  const registerForm = page.locator('#register-form');
  await expect(registerForm).toBeVisible({ timeout: 5000 });
  await registerForm.locator('input[name="name"]').fill('João Silva');
  await registerForm.locator('input[name="reg-email"]').fill('joaosilvaemail.com'); // sem @
  await registerForm.locator('input[name="reg-pass"]').fill('Senha@123');
  await registerForm.locator('input[name="reg-conf-pass"]').fill('Senha@123');
  await registerForm.locator('button[type="submit"]:has-text("Cadastrar")').click();
  // Expect error for email field
  const emailError = registerForm.locator('input[name="reg-email"] + .input__warging');
  await expect(emailError).toBeVisible({ timeout: 5000 });
  await expect(emailError).toHaveText('Formato inválido');
  // Ensure other fields remain filled and have no error
  await expect(registerForm.locator('input[name="name"]')).toHaveValue('João Silva');
  await expect(registerForm.locator('input[name="reg-pass"]')).toHaveValue('Senha@123');
  await expect(registerForm.locator('input[name="reg-conf-pass"]')).toHaveValue('Senha@123');
  // Check that other fields don't have error messages
  const nomeError = registerForm.locator('input[name="name"] + .input__warging');
  const senhaError = registerForm.locator('input[name="reg-pass"] + .input__warging');
  const confirmarSenhaError = registerForm.locator('input[name="reg-conf-pass"] + .input__warging');
  await expect(nomeError).toHaveText('');
  await expect(senhaError).toHaveText('');
  await expect(confirmarSenhaError).toHaveText('');
  // Still on register page
  await expect(registerForm).toBeVisible({ timeout: 5000 });
});

/**
 * TC04: Campos com Apenas Espaços em Branco
 */
test('TC04: Preenchimento do campo Nome com apenas espaços em branco', async ({ page }) => {
  const registerLink = page.locator('#show-register');
  await expect(registerLink).toBeVisible({ timeout: 5000 });
  await registerLink.click();
  const registerForm = page.locator('#register-form');
  await expect(registerForm).toBeVisible({ timeout: 5000 });
  await registerForm.locator('input[name="name"]').fill('   ');
  await registerForm.locator('input[name="reg-email"]').fill('joao@email.com');
  await registerForm.locator('input[name="reg-pass"]').fill('Senha@123');
  await registerForm.locator('input[name="reg-conf-pass"]').fill('Senha@123');
  await registerForm.locator('button[type="submit"]:has-text("Cadastrar")').click();
  const nomeError = registerForm.locator('input[name="name"] + .input__warging');
  await expect(nomeError).toBeVisible({ timeout: 5000 });
  await expect(nomeError).toHaveText('É campo obrigatório');
  // Other fields should be OK
  await expect(registerForm.locator('input[name="reg-email"] + .input__warging')).toHaveText('');
  await expect(registerForm.locator('input[name="reg-pass"] + .input__warging')).toHaveText('');
  await expect(registerForm.locator('input[name="reg-conf-pass"] + .input__warging')).toHaveText('');
  await expect(registerForm).toBeVisible({ timeout: 5000 });
});

/**
 * TC05: Nome com Caracteres Especiais ou Números
 */
test('TC05: Tentativa de cadastro com nome contendo caracteres especiais ou números', async ({ page }) => {
  const registerLink = page.locator('#show-register');
  await expect(registerLink).toBeVisible({ timeout: 5000 });
  await registerLink.click();
  const registerForm = page.locator('#register-form');
  await expect(registerForm).toBeVisible({ timeout: 5000 });
  await registerForm.locator('input[name="name"]').fill('João123!');
  await registerForm.locator('input[name="reg-email"]').fill('joao@email.com');
  await registerForm.locator('input[name="reg-pass"]').fill('Senha@123');
  await registerForm.locator('input[name="reg-conf-pass"]').fill('Senha@123');
  await registerForm.locator('button[type="submit"]:has-text("Cadastrar")').click();
  const nomeError = registerForm.locator('input[name="name"] + .input__warging');
  await expect(nomeError).toBeVisible({ timeout: 5000 });
  // Based on the error we saw in TC02, it seems the validation might be "É campo obrigatório" for invalid chars too
  // Let's check what the actual error is
  const nomeErrorText = await nomeError.textContent();
  // If it's not empty, it's showing an error
  await expect(nomeErrorText.length > 0).toBeTruthy();
  // Other fields should be OK
  await expect(registerForm.locator('input[name="reg-email"] + .input__warging')).toHaveText('');
  await expect(registerForm.locator('input[name="reg-pass"] + .input__warging')).toHaveText('');
  await expect(registerForm.locator('input[name="reg-conf-pass"] + .input__warging')).toHaveText('');
  await expect(registerForm).toBeVisible({ timeout: 5000 });
});

/**
 * TC06: Exceder Limite de Caracteres no Nome
 */
test('TC06: Tentativa de cadastro excedendo o limite de caracteres no campo nome', async ({ page }) => {
  const registerLink = page.locator('#show-register');
  await expect(registerLink).toBeVisible({ timeout: 5000 });
  await registerLink.click();
  const registerForm = page.locator('#register-form');
  await expect(registerForm).toBeVisible({ timeout: 5000 });
  const longName = 'a'.repeat(300);
  await registerForm.locator('input[name="name"]').fill(longName);
  await registerForm.locator('input[name="reg-email"]').fill('test@email.com');
  await registerForm.locator('input[name="reg-pass"]').fill('Senha@123');
  await registerForm.locator('input[name="reg-conf-pass"]').fill('Senha@123');
  await registerForm.locator('button[type="submit"]:has-text("Cadastrar")').click();
  const nomeError = registerForm.locator('input[name="name"] + .input__warging');
  await expect(nomeError).toBeVisible({ timeout: 5000 });
  const nomeErrorText = await nomeError.textContent();
  await expect(nomeErrorText.length > 0).toBeTruthy();
  // Other fields should be OK
  await expect(registerForm.locator('input[name="reg-email"] + .input__warging')).toHaveText('');
  await expect(registerForm.locator('input[name="reg-pass"] + .input__warging')).toHaveText('');
  await expect(registerForm.locator('input[name="reg-conf-pass"] + .input__warging')).toHaveText('');
  await expect(registerForm).toBeVisible({ timeout: 5000 });
});

/**
 * TC07: E-mail Duplicado (Cenário Adicional)
 */
test('TC07: Tentativa de cadastro com e-mail já existente no sistema', async ({ page }) => {
  // First, we need to create a user with a known email, then try to use the same email again.
  // We'll use a fixed email for the duplicate test, but we need to ensure it exists.
  // Since we don't have a way to set up data via API, we'll do:
  // 1. Register a user with a unique email (using timestamp) and remember it.
  // 2. Then, in the same test, try to register again with that same email.
  // However, note that after the first registration, we might be logged out or redirected.
  // We'll handle that by navigating back to the home page and clicking register again.

  // Step 1: Register a user (this will be the "existing" user)
  const registerLink = page.locator('#show-register');
  await expect(registerLink).toBeVisible({ timeout: 5000 });
  await registerLink.click();
  const registerForm = page.locator('#register-form');
  await expect(registerForm).toBeVisible({ timeout: 5000 });
  const email = `existente${Date.now()}@email.com`;
  await registerForm.locator('input[name="reg-email"]').fill(email);
  await registerForm.locator('input[name="name"]').fill('Usuario Existente');
  await registerForm.locator('input[name="reg-pass"]').fill('Senha@123');
  await registerForm.locator('input[name="reg-conf-pass"]').fill('Senha@123');
  await registerForm.locator('button[type="submit"]:has-text("Cadastrar")').click();

  // Wait for success message and then redirect to login/home
  const successMessage = page.locator('text=foi criada com sucesso');
  await expect(successMessage).toBeVisible({ timeout: 5000 });
  // After success, we stay on the same page or go to home/login - we'll just go back to home
  await page.goto('/');

  // Step 2: Navigate back to the register form and try to register with the same email
  await expect(registerLink).toBeVisible({ timeout: 5000 });
  await registerLink.click();
  await expect(registerForm).toBeVisible({ timeout: 5000 });

  await registerForm.locator('input[name="name"]').fill('Usuario Existente');
  await registerForm.locator('input[name="reg-email"]').fill(email); // same email
  await registerForm.locator('input[name="reg-pass"]').fill('Senha@123');
  await registerForm.locator('input[name="reg-conf-pass"]').fill('Senha@123');
  await registerForm.locator('button[type="submit"]:has-text("Cadastrar")').click();

  // Expect error for email field
  const emailError = registerForm.locator('input[name="reg-email"] + .input__warging');
  await expect(emailError).toBeVisible({ timeout: 5000 });
  const emailErrorText = await emailError.textContent();
  // We don't know the exact error text, but we know it's not empty
  await expect(emailErrorText.length > 0).toBeTruthy();
  // Other fields should be OK (no error)
  await expect(registerForm.locator('input[name="name"] + .input__warging')).toHaveText('');
  await expect(registerForm.locator('input[name="reg-pass"] + .input__warging')).toHaveText('');
  await expect(registerForm.locator('input[name="reg-conf-pass"] + .input__warging')).toHaveText('');
  // Still on register page
  await expect(registerForm).toBeVisible({ timeout: 5000 });
});

/**
 * TC08: Navegação da Página Inicial para a Página de Cadastro
 */
test('TC08: Verificação da navegação da página inicial para a página de cadastro', async ({ page }) => {
  await page.goto('/');
  const registerLink = page.locator('#show-register');
  await expect(registerLink).toBeVisible({ timeout: 5000 });
  await registerLink.click();
  // Check that the register form becomes visible
  const registerForm = page.locator('#register-form');
  await expect(registerForm).toBeVisible({ timeout: 5000 });
  // Check that form fields are visible within the register form
  await expect(registerForm.locator('input[name="name"]')).toBeVisible({ timeout: 5000 });
  await expect(registerForm.locator('input[name="reg-email"]')).toBeVisible({ timeout: 5000 });
  await expect(registerForm.locator('input[name="reg-pass"]')).toBeVisible({ timeout: 5000 });
  await expect(registerForm.locator('input[name="reg-conf-pass"]')).toBeVisible({ timeout: 5000 });
  await expect(registerForm.locator('button[type="submit"]:has-text("Cadastrar")')).toBeVisible({ timeout: 5000 });
});

/**
 * TC09: Validação de Elementos da UI na Página de Cadastro
 */
test('TC09: Validação dos elementos da interface na página de cadastro', async ({ page }) => {
  const registerLink = page.locator('#show-register');
  await expect(registerLink).toBeVisible({ timeout: 5000 });
  await registerLink.click();
  const registerForm = page.locator('#register-form');
  await expect(registerForm).toBeVisible({ timeout: 5000 });
  // Check for title indicative of registration page within the register form or nearby
  // Looking at the HTML, there's a "Voltar ao login" link and the form itself
  // Let's check for elements that indicate we're on the registration page
  await expect(page.locator('text=Voltar ao login')).toBeVisible({ timeout: 5000 });
  await expect(registerForm.locator('text=Criar conta com saldo ?')).toBeVisible({ timeout: 5000 });
  // Check input fields
  await expect(registerForm.locator('input[name="name"]')).toHaveAttribute('type', 'text');
  await expect(registerForm.locator('input[name="reg-email"]')).toHaveAttribute('type', 'email');
  await expect(registerForm.locator('input[name="reg-pass"]')).toHaveAttribute('type', 'password');
  await expect(registerForm.locator('input[name="reg-conf-pass"]')).toHaveAttribute('type', 'password');
  // Check placeholders (from earlier exploration, we know these placeholders exist)
  await expect(registerForm.locator('input[name="name"]')).toHaveAttribute('placeholder', 'Nome');
  await expect(registerForm.locator('input[name="reg-email"]')).toHaveAttribute('placeholder', 'E-mail');
  await expect(registerForm.locator('input[name="reg-pass"]')).toHaveAttribute('placeholder', 'Senha');
  await expect(registerForm.locator('input[name="reg-conf-pass"]')).toHaveAttribute('placeholder', 'Confirmação senha');
  // Check button
  await expect(registerForm.locator('button[type="submit"]:has-text("Cadastrar")')).toBeEnabled({ timeout: 5000 });
  await expect(registerForm.locator('button[type="submit"]:has-text("Cadastrar")')).toHaveText('Cadastrar', { timeout: 5000 });
});