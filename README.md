# PlaywrightAutomatedFramework

Suite de testes end-to-end para o fluxo de cadastro do BugBank, usando
Playwright Test e Page Object Model.

## Requisitos

- Node.js LTS
- Dependencias instaladas com `npm ci`
- Navegadores Playwright instalados com `npx playwright install`

## Comandos

```bash
npm ci
npx playwright install
npm test
npm run test:list
npm run report
```

Para abrir o navegador durante a depuracao:

```bash
HEADED=true npm test
```

Para executar contra outro ambiente, informe a URL sem alterar os testes:

```bash
BASE_URL=https://bugbank.netlify.app npm test
```

## Estrutura

```text
src/
  pages/       Page Objects e locators
  tests/       Casos automatizados
  utils/       Dados e acoes reutilizaveis
```

O `playwright.config.js` centraliza a URL base, artefatos de execucao,
reporters, retries de CI e o projeto Chromium.

## Observacao sobre os testes

Os casos CT-004 a CT-006 registram comportamentos atualmente aceitos pela
aplicacao, embora contrariem os criterios de validacao da historia. Eles
devem ser convertidos em expectativas de erro quando as validacoes do produto
forem corrigidas.
