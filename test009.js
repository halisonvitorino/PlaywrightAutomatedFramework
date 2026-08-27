const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://bugbank.netlify.app/');
  await page.click('button:has-text(\"Registrar\")');
  const form = page.locator('form').filter({ hasText: 'Voltar ao login' });
  await form.locator('input[placeholder=\"Informe seu Nome\"]').fill('João123');
  await form.locator('input[placeholder=\"Informe seu e-mail\"]').fill('joao@email.com');
  await form.locator('input[placeholder=\"Informe sua senha\"]').fill('Senha123!');
  await form.locator('input[placeholder=\"Informe a confirmação da senha\"]').fill('Senha123!');
  await form.locator('button:has-text(\"Cadastrar\")').click();
  await page.waitForTimeout(2000);
  const body = await page.innerText('body');
  console.log('BODY after invalid name submit:');
  console.log(body);
  await browser.close();
})();
