const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://bugbank.netlify.app/');
  console.log('Navigated to homepage');
  // Click register button
  await page.click('button:has-text(\"Registrar\")');
  await page.waitForTimeout(1000);
  console.log('Clicked Register');
  // Fill form with valid data
  await page.fill('input[placeholder=\"Informe seu e-mail\"]', 'teste@email.com');
  await page.fill('input[placeholder=\"Informe seu Nome\"]', 'João Silva');
  await page.fill('input[placeholder=\"Informe sua senha\"]', 'Senha123!');
  await page.fill('input[placeholder=\"Informe a confirmação da senha\"]', 'Senha123!');
  await page.click('button:has-text(\"Cadastrar\")');
  await page.waitForTimeout(2000);
  // Check for success message
  const successMsg = await page.locator('text=Cadastro realizado com sucesso!').isVisible();
  console.log('Success message visible:', successMsg);
  if (successMsg) {
    console.log('Test passed: Success message displayed');
  } else {
    console.log('Test failed: Success message not found');
    await page.screenshot({ path: 'screenshots/register-fail.png' });
  }
  await browser.close();
})();
