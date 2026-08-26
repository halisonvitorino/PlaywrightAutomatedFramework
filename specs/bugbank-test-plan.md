# Plano de Testes: Cadastro de Usuário - BugBank

## 1. Introdução

Este documento descreve o plano de testes abrangente para o recurso de cadastro de novos usuários no aplicativo BugBank disponível em https://bugbank.netlify.app/. Os testes são baseados na história de usuário e nos critérios de aceite definidos em `user-stories/signUp_feature.md`.

## 2. Escopo dos Testes

O plano de testes cobre todos os aspectos do fluxo de cadastro, incluindo:
- Validação de campos obrigatórios
- Validação de formato de dados (e-mail, nome, senha)
- Cenários de sucesso (happy path)
- Cenários de erro e validação negativa
- Testes de navegação e fluxo
- Validação de elementos da UI
- Testes de borda e condições limites

## 3. Critérios de Aceite Cobertos

Todos os critérios de aceite da história de usuário são abordados:
1. Acesso Restrito: Usuários não autenticados são redirecionados para a tela de login
2. Campos Obrigatórios: Todos os campos do formulário são obrigatórios e devem ser validados no front-end
3. Validação de Formato: Os campos devem respeitar os formatos esperados (ex: e-mail válido, nome, etc.)
4. Sucesso: Ao preencher todos os campos corretamente e submeter, o sistema deve exibir mensagem de sucesso
5. Erros: Caso algum campo obrigatório esteja vazio ou inválido, o sistema deve exibir mensagens de erro específicas

## 4. Estrutura dos Casos de Teste

Cada cenário de teste segue o formato Gherkin/BDD:
- **Título**: Descrição clara e concisa do cenário
- **Pré-condições**: Estado inicial necessário para executar o teste
- **Passos**: Sequência detalhada de ações a serem realizadas
- **Resultado Esperado**: Comportamento esperado após cada passo
- **Dados de Teste**: Informações específicas necessárias para executar o teste

## 5. Casos de Teste

### 5.1. Cenários de Caminho Feliz (Happy Path)

**CT-001: Cadastro com dados válidos**
- Pré-condições: Usuário está na página inicial do BugBank
- Passos:
  1. Clicar no link/button "Registrar" ou "Cadastrar"
  2. Preencher o campo "Nome" com "João Silva"
  3. Preencher o campo "E-mail" com "joao.silva@email.com"
  4. Preencher o campo "Senha" com "Senha123!"
  5. Preencher o campo "Confirmar Senha" com "Senha123!"
  6. Clicar no botão "Cadastrar"
- Resultado Esperado:
  - Sistema exibe mensagem de sucesso: "Cadastro realizado com sucesso!"
  - Usuário é redirecionado para a página inicial/home
  - Conta está ativa e pode ser usado para login

**CT-002: Cadastro com nome composto**
- Pré-condições: Usuário está na página de cadastro
- Passos:
  1. Preencher o campo "Nome" com "Maria Oliveira Santos"
  2. Preencher o campo "E-mail" com "maria.oliveira@teste.com"
  3. Preencher o campo "Senha" com "Teste@2024"
  4. Preencher o campo "Confirmar Senha" com "Teste@2024"
  5. Clicar no botão "Cadastrar"
- Resultado Esperado:
  - Mensagem de sucesso exibida
  - Redirecionamento para home page

### 5.2. Cenários Negativos (Validação de Erros)

**CT-003: Submeter formulário com todos os campos vazios**
- Pré-condições: Usuário está na página de cadastro com formulário limpo
- Passos:
  1. Não preencher nenhum campo
  2. Clicar no botão "Cadastrar"
- Resultado Esperado:
  - Sistema não permite a submissão
  - Mensagem de erro exibida ao lado de cada campo: "Este campo é obrigatório"
  - Formulário não é enviado

**CT-004: Campos obrigatórios parcialmente preenchidos**
- Pré-condições: Usuário está na página de cadastro
- Passos:
  1. Preencher apenas o campo "Nome" com "Ana Pereira"
  2. Deixar campos "E-mail", "Senha" e "Confirmar Senha" vazios
  3. Clicar no botão "Cadastrar"
- Resultado Esperado:
  - Mensagens de erro para os campos vazios: "Este campo é obrigatório"
  - Campo "Nome" não mostra erro (está preenchido)
  - Formulário não é enviado

**CT-005: E-mail em formato inválido (sem @)**
- Pré-condições: Usuário está na página de cadastro
- Passos:
  1. Preencher o campo "Nome" com "Carlos Mendes"
  2. Preencher o campo "E-mail" com "carlosmendesemail.com" (sem @)
  3. Preencher o campo "Senha" com "Senha123!"
  4. Preencher o campo "Confirmar Senha" com "Senha123!"
  5. Clicar no botão "Cadastrar"
- Resultado Esperado:
  - Sistema exibe mensagem de erro específica para e-mail: "E-mail inválido"
  - Outros campos não mostram erro (se preenchidos corretamente)
  - Formulário não é enviado

**CT-006: E-mail em formato inválido (sem domínio)**
- Pré-condições: Usuário está na página de cadastro
- Passos:
  1. Preencher o campo "Nome" com "Laura Costa"
  2. Preencher o campo "E-mail" with "laura@"
  3. Preencher o campo "Senha" com "Senha123!"
  4. Preencher o campo "Confirmar Senha" com "Senha123!"
  5. Clicar no botão "Cadastrar"
- Resultado Esperado:
  - Sistema exibe mensagem de erro: "E-mail inválido"
  - Formulário não é enviado

**CT-007: Senha e confirmação de senha não coincidem**
- Pré-condições: Usuário está na página de cadastro
- Passos:
  1. Preencher o campo "Nome" com "Rafael Lima"
  2. Preencher o campo "E-mail" with "rafael@email.com"
  3. Preencher o campo "Senha" with "Senha123!"
  4. Preencher o campo "Confirmar Senha" with "Senha456!"
  5. Clicar no botão "Cadastrar"
- Resultado Esperado:
  - Sistema exibe mensagem de erro: "As senhas não coincidem"
  - Campos de senha destacam o erro
  - Formulário não é enviado

### 5.3. Cenários de Validação de Campos Específicos

**CT-008: Campo Nome com apenas espaços em branco**
- Pré-condições: Usuário está na página de cadastro
- Passos:
  1. Preencher o campo "Nome" com "   " (apenas espaços)
  2. Preencher o campo "E-mail" with "teste@email.com"
  3. Preencher o campo "Senha" with "Senha123!"
  4. Preencher o campo "Confirmar Senha" with "Senha123!"
  5. Clicar no botão "Cadastrar"
- Resultado Esperado:
  - Sistema trata o campo como vazio
  - Exibe mensagem de erro: "O campo Nome é obrigatório"
  - Formulário não é enviado

**CT-009: Nome contendo números (inválido conforme critérios)**
- Pré-condições: Usuário está na página de cadastro
- Passos:
  1. Preencher o campo "Nome" with "João123"
  2. Preencher o campo "E-mail" with "joao@email.com"
  3. Preencher o campo "Senha" with "Senha123!"
  4. Preencher o campo "Confirmar Senha" with "Senha123!"
  5. Clicar no botão "Cadastrar"
- Resultado Esperado:
  - Sistema exibe mensagem de erro para o campo Nome
  - Formulário não é enviado

**CT-010: Nome contendo caracteres especiais**
- Pré-condições: Usuário está na página de cadastro
- Passos:
  1. Preencher o campo "Nome" with "João@Silva!"
  2. Preencher o campo "E-mail" with "joao@email.com"
  3. Preencher o campo "Senha" with "Senha123!"
  4. Preencher o campo "Confirmar Senha" with "Senha123!"
  5. Clicar no botão "Cadastrar"
- Resultado Esperado:
  - Sistema exibe mensagem de erro para o campo Nome
  - Formulário não é enviado

**CT-011: Senha muito curta (menos de 6 caracteres)**
- Pré-condições: Usuário está na página de cadastro
- Passos:
  1. Preencher o campo "Nome" with "Pedro Alves"
  2. Preencher o campo "E-mail" with "pedro@email.com"
  3. Preencher o campo "Senha" with "123"
  4. Preencher o campo "Confirmar Senha" with "123"
  5. Clicar no botão "Cadastrar"
- Resultado Esperado:
  - Sistema exibe mensagem de erro para senha: "A senha deve ter pelo menos 6 caracteres"
  - Formulário não é enviado

**CT-012: Senha sem letras**
- Pré-condições: Usuário está na página de cadastro
- Passos:
  1. Preencher o campo "Nome" with "Mariana Cruz"
  2. Preencher o campo "E-mail" with "mariana@email.com"
  3. Preencher o campo "Senha" with "123456!"
  4. Preencher o campo "Confirmar Senha" with "123456!"
  5. Clicar no botão "Cadastrar"
- Resultado Esperado:
  - Sistema exibe mensagem de erro para senha (se aplicável às regras de validação)
  - Formulário não é enviado

### 5.4. Testes de Borda e Condições Limites

**CT-013: Nome com limite mínimo de caracteres (1 caractere)**
- Pré-condições: Usuário está na página de cadastro
- Passos:
  1. Preencher o campo "Nome" with "A"
  2. Preencher o campo "E-mail" with "teste@email.com"
  3. Preencher o campo "Senha" with "Senha123!"
  4. Preencher o campo "Confirmar Senha" with "Senha123!"
  5. Clicar no botão "Cadastrar"
- Resultado Esperado:
  - Sistema aceita o nome (se 1 caractere for mínimo válido)
  - Ou exibe erro se o mínimo for maior que 1
  - Comportamento deve ser consistente com requisitos

**CT-014: Nome com limite máximo de caracteres**
- Pré-condições: Usuário está na página de cadastro
- Passos:
  1. Preencher o campo "Nome" with "A".repeat(100) (100 caracteres)
  2. Preencher o campo "E-mail" with "teste@email.com"
  3. Preencher o campo "Senha" with "Senha123!"
  4. Preencher o campo "Confirmar Senha" with "Senha123!"
  5. Clicar no botão "Cadastrar"
- Resultado Esperado:
  - Sistema aceita se 100 caracteres estiver dentro do limite
  - Exibe erro se ultrapassar o limite máximo permitido
  - Mensagem de erro específica: "O nome deve ter no máximo X caracteres"

**CT-015: E-mail com limite máximo de caracteres**
- Pré-condições: Usuário está na página de cadastro
- Passos:
  1. Preencher o campo "Nome" with "Teste Usuario"
  2. Preencher o campo "E-mail" with "a".repeat(50) + "@teste.com" (e-mail longo)
  3. Preencher o campo "Senha" with "Senha123!"
  4. Preencher o campo "Confirmar Senha" with "Senha123!"
  5. Clicar no botão "Cadastrar"
- Resultado Esperado:
  - Sistema aceita se estiver dentro do limite
  - Exibe erro de "E-mail inválido" ou específico se ultrapassar limite

**CT-016: Tentativa de cadastro com e-mail já existente**
- Pré-condições: 
  1. Um usuário com e-mail "existing@test.com" já está cadastrado
  2. Usuário atual está na página de cadastro
- Passos:
  1. Preencher o campo "Nome" with "Novo Usuario"
  2. Preencher o campo "E-mail" with "existing@test.com" (e-mail já usado)
  3. Preencher o campo "Senha" with "Senha123!"
  4. Preencher o campo "Confirmar Senha" with "Senha123!"
  5. Clicar no botão "Cadastrar"
- Resultado Esperado:
  - Sistema exibe mensagem de erro: "E-mail já está em uso" ou similar
  - Formulário não é enviado
  - Campos permanecem preenchidos para correção

### 5.5. Testes de Navegação e Fluxo

**CT-017: Navegação para página de cadastro a partir da home**
- Pré-condições: Usuário está na página inicial do BugBank
- Passos:
  1. Localizar e clicar no link/button "Registrar", "Cadastrar" ou "Sign Up"
- Resultado Esperado:
  - Sistema navega para a página de cadastro
  - URL muda para incluir "/register" ou similar
  - Formulário de cadastro é exibido com todos os campos visíveis

**CT-018: Comportamento do botão "Voltar" após navegar para cadastro**
- Pré-condições: Usuário naveguou para a página de cadastro
- Passos:
  1. Clicar no botão "Voltar" do navegador
- Resultado Esperado:
  - Sistema retorna para a página anterior (home)
  - URL corresponde à página inicial
  - Nenhum dado do formulário é perdido ou salva indevidamente

**CT-019: Limpar formulário após cancelamento**
- Pré-condições: Usuário está na página de cadastro com alguns campos preenchidos
- Passos:
  1. Clicar em um link para cancelar ou voltar (se disponível)
  2. Navegar de volta para a página de cadastro
- Resultado Esperado:
  - Formulário aparece limpo (dependendo da implementação)
  - Ou mantém os valores (também aceitável se documentado)

**CT-020: Redirecionamento após login bem-sucedido**
- Pré-condições: Usuário acabou de se cadastrar com sucesso
- Passos:
  1. Aguardar o processamento do cadastro
- Resultado Esperado:
  - Sistema exibe mensagem de sucesso
  - Usuário é automaticamente redirecionado para a home page
  - URL corresponde à página inicial

### 5.6. Testes de Validação de Elementos da UI

**CT-021: Verificação de presença de todos os elementos do formulário**
- Pré-condições: Usuário está na página de cadastro
- Passos:
  1. Verificar visualmente a presença de:
     - Campo de entrada para Nome
     - Campo de entrada para E-mail
     - Campo de entrada para Senha
     - Campo de entrada para Confirmar Senha
     - Botão de submit "Cadastrar"
     - Links para "Já tem conta? Fazer login"
- Resultado Esperado:
  - Todos os elementos estão presentes e visíveis
  - Elementos estão alinhados corretamente
  - Não há elementos sobrepostos ou ocultos

**CT-022: Verificação de placeholders e rótulos dos campos**
- Pré-condições: Usuário está na página de cadastro
- Passos:
  1. Verificar que cada campo tem seu rótulo associado
  2. Verificar placeholders descritivos (se aplicável)
- Resultado Esperado:
  - Rótulos claros: "Nome", "E-mail", "Senha", "Confirmar Senha"
  - Placeholders úteis quando presentes
  - Associação correta label-input para acessibilidade

**CT-023: Estado inicial dos campos (vazios)**
- Pré-condições: Usuário carrega a página de cadastro
- Passos:
  1. Verificar estado inicial de todos os campos de entrada
- Resultado Esperado:
  - Todos os campos começam vazios
  - Nenhum valor pré-preenchido (exceto valores do navegador como autocomplete)

**CT-024: Foco inicial no primeiro campo**
- Pré-condições: Usuário carrega a página de cadastro
- Passos:
  1. Verificar qual campo recebe o foco inicial ao carregar a página
- Resultado Esperado:
  - Primeiro campo (Nome) recebe foco automaticamente
  - Cursor está piscando no campo Nome pronto para digitação

**CT-025: Navegação com tecla Tab entre campos**
- Pré-condições: Usuário está na página de cadastro com foco no primeiro campo
- Passos:
  1. Pressionar Tab para mover entre os campos
  2. Verificar ordem de tabulação
- Resultado Esperado:
  - Ordem lógica: Nome → E-mail → Senha → Confirmar Senha → Botão Cadastrar
  - Nenhum campo é pulado na sequência
  - Botão Cadastrar está incluído na tabulação

**CT-026: Envio do formulário com tecla Enter**
- Pré-condições: Usuário está preenchendo o último campo do formulário
- Passos:
  1. Preencher todos os campos com dados válidos
  2. Posicionar cursor no último campo (Confirmar Senha)
  3. Pressionar Enter
- Resultado Esperado:
  - Formulário é submetido como se o botão "Cadastrar" tivesse sido clicado
  - Mesma validação e comportamento do clique no botão

**CT-027: Mensagens de erro aparecem em tempo real**
- Pré-condições: Usuário está na página de cadastro
- Passos:
  1. Deixar o campo Nome vazio
  2. Mover o foco para outro campo (ex: clicar no campo E-mail)
- Resultado Esperado:
  - Mensagem de erro aparece imediatamente quando o campo perde o foco
  - Mensagem específica: "O campo Nome é obrigatório"
  - Indicação visual (geralmente vermelho) ao lado do campo

**CT-028: Mensagens de erro desaparecem após correção**
- Pré-condições: Usuário está na página de cadastro com erro no campo Nome
- Passos:
  1. Campo Nome exibe mensagem de erro
  2. Usuário digita um nome válido no campo Nome
- Resultado Esperado:
  - Mensagem de erro some assim que o campo passa a ser válido
  - Indicação visual de erro desaparece
  - Campo retorna ao estado normal

**CT-029: Estado de carregamento durante submissão**
- Pré-condições: Usuário preencheu todos os campos corretamente
- Passos:
  1. Clicar no botão "Cadastrar"
- Resultado Esperado:
  - Botão "Cadastrar" mostra estado de carregamento (spinner ou texto alterado)
  - Botão fica desabilitado durante o processamento
  - Evita submissão múltipla

**CT-030: Responsividade do formulário em diferentes tamanhos de tela**
- Pré-condições: Acessar a página de cadastro em diferentes dispositivos
- Passos:
  1. Testar em largura de tela: 320px (mobile), 768px (tablet), 1024px (small desktop), 1920px (desktop)
- Resultado Esperado:
  - Formulário se adapta corretamente ao tamanho da tela
  - Todos os elementos permanecem visíveis e acessíveis
  - Não há overflow ou corte de elementos
  - Botões permanecem clicáveis
  - Espaçamento adequado entre elementos

## 6. Dados de Teste

### 6.1. Dados Válidos para Testes de Sucesso
| Campo | Valor de Exemplo | Descrição |
|-------|------------------|-----------|
| Nome | João Silva, Maria Oliveira, Carlos Mendes | Nomes válidos sem números ou caracteres especiais |
| E-mail | joao.silva@email.com, teste@teste.org, usuario@dominio.com.br | E-mails válidos com diferentes domínios |
| Senha | Senha123!, Teste@2024, MinhaSenha123 | Senhas com pelo menos 6 caracteres, letras e números |
| Confirmar Senha | (mesmo valor da senha) | Deve ser idêntico ao campo Senha |

### 6.2. Dados Inválidos para Testes Negativos
| Campo | Valor Inválido | Tipo de Erro Esperado |
|-------|----------------|----------------------|
| Nome | "" (vazio), "   " (espaços), "João123" (números), "João@!" (especiais) | Campo obrigatório / formato inválido |
| E-mail | "" (vazio), "testeemail.com" (sem @), "teste@" (sem domínio), "@teste.com" (sem local) | E-mail inválido |
| Senha | "" (vazio), "123" (muito curta), "abcdef" (sem números), "123456" (sem letras) | Senha inválida / muito curta |
| Confirmar Senha | Valor diferente do campo Senha | Senhas não coincidem |

### 6.3. Dados de Borda (Boundary Testing)
| Campo | Valor Mínimo | Valor Máximo | Comentário |
|-------|--------------|--------------|------------|
| Nome | 1 caractere | 100 caracteres (exemplo) | Verificar limites definidos |
| E-mail | 5 caracteres (a@b.c) | 254 caracteres (limite RFC) | Verificar limites de implementação |
| Senha | 6 caracteres | 20 caracteres (exemplo) | Verificar política de senha |

## 7. Requisitos de Ambiente

### 7.1. Pré-requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexão com internet para acessar https://bugbank.netlify.app/
- Conta de e-mail válida para testes (opcional, dependendo se o sistema envia confirmação)

### 7.2. Configuração de Teste
- Resolução de tela mínima: 1024x768
- Cookies e JavaScript habilitados
- Cache limpo entre sessões de teste quando apropriado
- Modo anônimo/incognito recomendado para evitar conflitos de sessão

## 8. Critérios de Pass/Fail

### 8.1. Critérios de Passagem
- Todos os passos do cenário de teste são executados conforme descrito
- Resultados esperados ocorrem exatamente como especificado
- Nenhum erro inesperado ou exceção ocorre durante a execução
- Mensagens de validação aparecem nos campos corretos
- Fluidez da aplicação não é interrompida (sem travamentos)

### 8.2. Critérios de Falha
- Qualquer passo não pode ser executado como descrito
- Resultado esperado não ocorre
- Ocorre erro inesperado (ex: página não carrega, exceção JavaScript)
- Mensagens de erro aparecem em campos incorretos ou não aparecem quando deveriam
- Formulário é submetido com dados inválidos
- Sistema permite submissão quando deveria impedir
- Comportamento inconsistente entre execuções idênticas

## 9. Rastreabilidade com Critérios de Aceite

Este plano de testes garante cobertura total dos critérios de aceite da história de usuário:

| Critério de Aceite | Casos de Teste Relacionados |
|--------------------|----------------------------|
| 1. Acesso Restrito | CT-017, CT-018 (fluxo de navegação) |
| 2. Campos Obrigatórios | CT-003, CT-004, CT-008, CT-027, CT-028 |
| 3. Validação de Formato | CT-005, CT-006, CT-009, CT-010, CT-011, CT-012 |
| 4. Sucesso | CT-001, CT-002, CT-019, CT-020 |
| 5. Erros Específicos | CT-003 através CT-016, CT-027, CT-028 |

## 10. Considerações de Automação

Para automação futura com Playwright (conforme mencionado nas notas técnicas):

### 10.1. Seletores Recomendados
- Campos de entrada: usar `label` seguido de `input[name="fieldname"]` ou placeholder
- Botão cadastrar: `button:has-text("Cadastrar")`
- Mensagens de sucesso: elementos com classe contendo "success" ou texto específico
- Mensagens de erro: elementos próximo aos campos com texto de erro ou classe "error"

### 10.2. Boas Práticas
- Usar `test.expect` para assertivas claras
- Implementar Page Object Model para manter teste limpo
- Usar fixtures para limpar estado entre testes
- Capturar screenshots em falhas para análise
- Testar em múltiplas viewports para responsividade

## 11. Aprovação e Sign-off

Este plano de testes será considerado completo quando:
- Todos os cenários de teste forem revisados e aprovados pela equipe de QA
- Casos de teste adicionais forem identificados durante revisão e incorporados
- Scripts de automação forem criados para cenários críticos
- Resultados dos testes iniciais forem documentados e arquivados

---

*Plano de Testes criado baseado na história de usuário em `user-stories/signUp_feature.md`*
*Data de criação: $(date)*
*Última revisão: $(date)*