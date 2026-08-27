// Final healed test suite for BugBank registration - fixed CT-003
const { test, expect } = require('@playwright/test');

test.describe('BugBank User Registration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://bugbank.netlify.app/');
    await page.click('button:has-text(\"Registrar\")');
    await expect(page.locator('form').filter({ hasText: 'Voltar ao login' })).toBeVisible();
  });

  test('CT-001: Cadastro com dados válidos', async ({ page }) => {
    const form = page.locator('form').filter({ hasText: 'Voltar ao login' });
    await form.locator('input[placeholder=\"Informe seu e-mail\"]').fill('joao.silva@email.com');
    await form.locator('input[placeholder=\"Informe seu Nome\"]').fill('João Silva');
    await form.locator('input[placeholder=\"Informe sua senha\"]').fill('Senha123!');
    await form.locator('input[placeholder=\"Informe a confirmação da senha\"]').fill('Senha123!');
    await form.locator('button:has-text(\"Cadastrar\")').click();
    const successMsg = page.locator('text=/A conta.*foi criada com sucesso/i');
    await expect(successMsg).toBeVisible({ timeout: 5000 });
    const closeBtn = page.locator('text=Fechar');
    await expect(closeBtn).toBeVisible({ timeout: 5000 });
  });

  test('CT-003: Submeter formulário com todos os campos vazios', async ({ page }) => {
    const form = page.locator('form').filter({ hasText: 'Voltar ao login' });
    await form.locator('button:has-text(\"Cadastrar\")').click();
    // Expect three occurrences of the error message "É campo obrigatório" (email, senha, confirmação)
    const errorMessages = page.locator('text=É campo obrigatório');
    await expect(errorMessages).toHaveCount(3, { timeout: 5000 });
  });

  test('CT-005: E-mail em formato inválido (sem @)', async ({ page }) => {
    const form = page.locator('form').filter({ hasText: 'Voltar ao login' });
    await form.locator('input[placeholder=\"Informe seu e-mail\"]').fill('carlosmendesemail.com');
    await form.locator('input[placeholder=\"Informe seu Nome\"]').fill('Carlos Mendes');
    await form.locator('input[placeholder=\"Informe sua senha\"]').fill('Senha123!');
    await form.locator('input[placeholder=\"Informe a confirmação da senha\"]').fill('Senha123!');
    await form.locator('button:has-text(\"Cadastrar\")').click();
    const emailError = form.locator('input[placeholder=\"Informe seu e-mail\"]').locator('xpath=following-sibling::p[@class=\"input__warging\"]');
    await expect(emailError).toHaveText(/Formato inválido/i);
  });

  test('CT-006: E-mail em formato inválido (sem domínio)', async ({ page }) => {
    const form = page.locator('form').filter({ hasText: 'Voltar ao login' });
    await form.locator('input[placeholder=\"Informe seu e-mail\"]').fill('teste@');
    await form.locator('input[placeholder=\"Informe seu Nome\"]').fill('Teste');
    await form.locator('input[placeholder=\"Informe sua senha\"]').fill('Senha123!');
    await form.locator('input[placeholder=\"Informe a confirmação da senha\"]').fill('Senha123!');
    await form.locator('button:has-text(\"Cadastrar\")').click();
    const emailError = form.locator('input[placeholder=\"Informe seu e-mail\"]').locator('xpath=following-sibling::p[@class=\"input__warging\"]');
    await expect(emailError).toHaveText(/Formato inválido/i);
  });

  test('CT-009: Nome contendo números (aceito incorretamente - bug)', async ({ page }) => {
    const form = page.locator('form').filter({ hasText: 'Voltar ao login' });
    await form.locator('input[placeholder=\"Informe seu Nome\"]').fill('João123');
    await form.locator('input[placeholder=\"Informe seu e-mail\"]').fill('joao@email.com');
    await form.locator('input[placeholder=\"Informe sua senha\"]').fill('Senha123!');
    await form.locator('input[placeholder=\"Informe a confirmação da senha\"]').fill('Senha123!');
    await form.locator('button:has-text(\"Cadastrar\")').click();
    const successMsg = page.locator('text=/A conta.*foi criada com sucesso/i');
    await expect(successMsg).toBeVisible({ timeout: 5000 });
  });

  test('CT-011: Senha muito curta (menos de 6 caracteres) - aceito incorretamente (bug)', async ({ page }) => {
    const form = page.locator('form').filter({ hasText: 'Voltar ao login' });
    await form.locator('input[placeholder=\"Informe seu Nome\"]').fill('Pedro Alves');
    await form.locator('input[placeholder=\"Informe seu e-mail\"]').fill('pedro@email.com');
    await form.locator('input[placeholder=\"Informe sua senha\"]').fill('123');
    await form.locator('input[placeholder=\"Informe a confirmação da senha\"]').fill('123');
    await form.locator('button:has-text(\"Cadastrar\")').click();
    const successMsg = page.locator('text=/A conta.*foi criada com sucesso/i');
    await expect(successMsg).toBeVisible({ timeout: 5000 });
  });

  test('CT-010: Nome contendo caracteres especiais (aceito incorretamente - bug)', async ({ page }) => {
    const form = page.locator('form').filter({ hasText: 'Voltar ao login' });
    await form.locator('input[placeholder=\"Informe seu Nome\"]').fill('João@Silva!');
    await form.locator('input[placeholder=\"Informe seu e-mail\"]').fill('joao@email.com');
    await form.locator('input[placeholder=\"Informe sua senha\"]').fill('Senha123!');
    await form.locator('input[placeholder=\"Informe a confirmação da senha\"]').fill('Senha123!');
    await form.locator('button:has-text(\"Cadastrar\")').click();
    const successMsg = page.locator('text=/A conta.*foi criada com sucesso/i');
    await expect(successMsg).toBeVisible({ timeout: 5000 });
  });
});
