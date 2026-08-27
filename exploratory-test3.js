const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://bugbank.netlify.app/');
  await page.click('button:has-text(\"Registrar\")');
  await page.waitForTimeout(1000);
  const emailInput = page.locator('input[placeholder=\"Informe seu e-mail\"]');
  await emailInput.fill('teste@email.com');
  const nameInput = page.locator('input[placeholder=\"Informe seu Nome\"]');
  await nameInput.fill('João Silva');
  const passInput = page.locator('input[placeholder=\"Informe sua senha\"]');
  await passInput.fill('Senha123!');
  const passConfInput = page.locator('input[placeholder=\"Informe a confirmação da senha\"]');
  await passConfInput.fill('Senha123!');
  // Log values
  console.log('Email value:', await emailInput.inputValue());
  console.log('Name value:', await nameInput.inputValue());
  console.log('Pass value:', await passInput.inputValue());
  console.log('PassConf value:', await passConfInput.inputValue());
  await page.click('button:has-text(\"Cadastrar\")');
  await page.waitForTimeout(3000);
  const body = await page.innerText('body');
  console.log('Body after submit:', body.substring(0, 800));
  await browser.close();
})();
