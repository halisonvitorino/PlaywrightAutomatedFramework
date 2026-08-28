class SignUpPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/");
    await this.page.getByRole("button", { name: "Registrar" }).click();
    await this.form.waitFor();
  }

  async fillForm(data) {
    await this.emailInput.fill(data.email);
    await this.nameInput.fill(data.name);
    await this.passwordInput.fill(data.password);
    await this.confirmPasswordInput.fill(data.confirmPassword);
  }

  async submit() {
    await this.form.getByRole("button", { name: "Cadastrar" }).click();
  }

  get form() {
    return this.page.locator('form:has-text("Voltar ao login")');
  }

  get emailInput() {
    return this.form.getByPlaceholder("Informe seu e-mail");
  }

  get nameInput() {
    return this.form.getByPlaceholder("Informe seu Nome");
  }

  get passwordInput() {
    return this.form.getByPlaceholder("Informe sua senha");
  }

  get confirmPasswordInput() {
    return this.form.getByPlaceholder("Informe a confirmação da senha");
  }

  get successMessage() {
    return this.page.getByText(/A conta.*foi criada com sucesso/i);
  }

  get closeSuccessMessage() {
    return this.page.getByText("Fechar", { exact: true });
  }

  get emailError() {
    return this.emailInput.locator("xpath=following-sibling::p");
  }

  get emailFormatError() {
    return this.form.getByText("Formato inválidos");
  }

  get nameError() {
    return this.nameInput.locator("xpath=following-sibling::p");
  }

  get passwordError() {
    return this.passwordInput.locator("xpath=following-sibling::p");
  }

  get confirmPasswordError() {
    return this.confirmPasswordInput.locator("xpath=following-sibling::p");
  }

  async getRequiredErrorCount() {
    return this.page.getByText(/campo obrigatório/i).count();
  }
}

module.exports = { SignUpPage };
