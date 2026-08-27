const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://bugbank.netlify.app/');
  await page.click('button:has-text(\"Registrar\")');
  await page.waitForTimeout(1000);
  await page.fill('input[placeholder=\"Informe seu e-mail\"]', 'teste@email.com');
  await page.fill('input[placeholder=\"Informe seu Nome\"]', 'João Silva');
  await page.fill('input[placeholder=\"Informe sua senha\"]', 'Senha123!');
  await page.fill('input[placeholder=\"Informe a confirmação da senha\"]', 'Senha123!');
  await page.click('button:has-text(\"Cadastrar\")');
  await page.waitForTimeout(3000);
  const body = await page.innerText('body');
  console.log('Body snippet:', body.substring(0, 500));
  // Look for error messages
  const errorMsg = await page.locator('.input__warging').first().innerText();
  console.log('First error message:', errorMsg);
  await browser.close();
})();
