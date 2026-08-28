const { randomUUID } = require("node:crypto");

function uniqueEmail(prefix = "test") {
  return `${prefix}.${randomUUID()}@email.com`;
}

function generateValidUser() {
  return {
    email: uniqueEmail("joao.silva"),
    name: "Joao Silva",
    password: "Senha123!",
    confirmPassword: "Senha123!",
  };
}

function generateInvalidEmailUser(atMissing = true, domainMissing = false) {
  const email = atMissing
    ? domainMissing
      ? "teste@"
      : "carlosmendesemail.com"
    : "joao@email.com";
  return {
    email,
    name: "Test User",
    password: "Senha123!",
    confirmPassword: "Senha123!",
  };
}

function generateShortPasswordUser() {
  return {
    email: uniqueEmail("short"),
    name: "Test User",
    password: "123",
    confirmPassword: "123",
  };
}

function generateEmptyFieldsUser() {
  return {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  };
}

function generateUserWithNumbersInName() {
  return {
    email: uniqueEmail("numbers"),
    name: "João123",
    password: "Senha123!",
    confirmPassword: "Senha123!",
  };
}

function generateUserWithSpecialCharsInName() {
  return {
    email: uniqueEmail("special"),
    name: "João@Silva!",
    password: "Senha123!",
    confirmPassword: "Senha123!",
  };
}

module.exports = {
  generateValidUser,
  generateInvalidEmailUser,
  generateShortPasswordUser,
  generateEmptyFieldsUser,
  generateUserWithNumbersInName,
  generateUserWithSpecialCharsInName,
};
