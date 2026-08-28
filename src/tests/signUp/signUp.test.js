// Refactored test suite using SignUp Page Object
const { test, expect } = require("@playwright/test");
const { SignUpPage } = require("../../pages/signUpPage");
const {
  generateValidUser,
  generateInvalidEmailUser,
  generateShortPasswordUser,
  generateUserWithNumbersInName,
  generateUserWithSpecialCharsInName,
} = require("../../utils/testData");

test.describe("BugBank User Registration", () => {
  let signUpPage;

  test.beforeEach(async ({ page }) => {
    signUpPage = new SignUpPage(page);
    await signUpPage.goto();
  });

  test("CT-001: Cadastro com dados válidos", async () => {
    await signUpPage.fillForm(generateValidUser());
    await signUpPage.submit();
    await expect(signUpPage.successMessage).toBeVisible({ timeout: 5000 });
    await expect(signUpPage.closeSuccessMessage).toBeVisible({ timeout: 5000 });
  });

  test("CT-002: Submeter formulário com todos os campos vazios", async () => {
    await signUpPage.submit();
    const errorMessages = signUpPage.page.getByText(/campo obrigatório/i);
    await expect(errorMessages).toHaveCount(3, { timeout: 5000 });
  });

  test("CT-003: E-mail em formato inválido", async () => {
    await signUpPage.fillForm(generateInvalidEmailUser());
    await signUpPage.submit();
    await expect(signUpPage.emailFormatError).toHaveText("Formato inválido");
  });

  test("CT-004: Nome contendo números (aceito incorretamente - bug)", async () => {
    await signUpPage.fillForm(generateUserWithNumbersInName());
    await signUpPage.submit();
    await expect(signUpPage.successMessage).toBeVisible({ timeout: 5000 });
  });

  test("CT-005: Senha muito curta (menos de 6 caracteres) - aceito incorretamente (bug)", async () => {
    await signUpPage.fillForm(generateShortPasswordUser());
    await signUpPage.submit();
    await expect(signUpPage.successMessage).toBeVisible({ timeout: 5000 });
  });

  test("CT-006: Nome contendo caracteres especiais (aceito incorretamente - bug)", async () => {
    await signUpPage.fillForm(generateUserWithSpecialCharsInName());
    await signUpPage.submit();
    await expect(signUpPage.successMessage).toBeVisible({ timeout: 5000 });
  });
});
