const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://bugbank.netlify.app/');
  await page.click('button:has-text(\"Registrar\")');
  const form = page.locator('form').filter({ hasText: 'Voltar ao login' });
  // Do not fill anything, just click submit
  await form.locator('button:has-text(\"Cadastrar\")').click();
  await page.waitForTimeout(2000);
  const body = await page.innerText('body');
  console.log('BODY after empty submit:');
  console.log(body);
  await browser.close();
})();
