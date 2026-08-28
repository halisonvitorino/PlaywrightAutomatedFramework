// Reusable actions for sign-up workflow
const { SignUpPage } = require("../pages/signUpPage");

/**
 * Navigates to the sign-up form and returns the page object
 * @param {import("@playwright/test").Page} page
 * @returns {Promise<SignUpPage>}
 */
async function gotoSignUp(page) {
  const signUpPage = new SignUpPage(page);
  await signUpPage.goto();
  return signUpPage;
}

/**
 * Fills the sign-up form with the provided data and submits it
 * @param {import("@playwright/test").Page} page
 * @param {{email:string, name:string, password:string, confirmPassword:string}} data
 * @returns {Promise<void>}
 */
async function fillAndSubmitSignUp(page, data) {
  const signUpPage = new SignUpPage(page);
  await signUpPage.goto();
  await signUpPage.fillForm(data);
  await signUpPage.submit();
}

/**
 * Attempts to submit the sign-up form with empty fields (used for validation tests)
 * @param {import("@playwright/test").Page} page
 * @returns {Promise<void>}
 */
async function submitEmptySignUp(page) {
  const signUpPage = new SignUpPage(page);
  await signUpPage.goto();
  await signUpPage.submit();
}

module.exports = {
  gotoSignUp,
  fillAndSubmitSignUp,
  submitEmptySignUp
};
