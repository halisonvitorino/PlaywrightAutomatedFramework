// Custom assertions for sign-up validation
const { expect } = require('@playwright/test');

/**
 * Asserts that the success message is visible
 * @param {Locator} successMessageLocator
 */
async function assertSuccessMessageVisible(successMessageLocator) {
  await expect(successMessageLocator).toBeVisible();
}

/**
 * Asserts that the email error message is visible and contains expected text
 * @param {Locator} emailErrorLocator
 * @param {string|RegExp} expectedText
 */
async function assertEmailErrorVisible(emailErrorLocator, expectedText) {
  await expect(emailErrorLocator).toBeVisible();
  await expect(emailErrorLocator).toHaveText(expectedText);
}

/**
 * Asserts that a field shows the ""campo obrigatório"" error
 * @param {Locator} fieldErrorLocator
 */
async function assertRequiredErrorVisible(fieldErrorLocator) {
  await expect(fieldErrorLocator).toBeVisible();
  await expect(fieldErrorLocator).toHaveText(/ campo obrigatório/i);
}

/**
 * Asserts that the number of ""campo obrigatório"" messages matches expected count
 * @param {Locator} errorLocator
 * @param {number} expectedCount
 */
async function assertRequiredErrorCount(errorLocator, expectedCount) {
  await expect(errorLocator).toHaveCount(expectedCount);
}

module.exports = {
  assertSuccessMessageVisible,
  assertEmailErrorVisible,
  assertRequiredErrorVisible,
  assertRequiredErrorCount
};
