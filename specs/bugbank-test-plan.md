# Plano de Testes: Funcionalidade de Cadastro de Novo Usuário (SignUp)

## 1. Introdução
Este plano de teste descreve os cenários de teste para validar a funcionalidade de cadastro de novos usuários no sistema Bugbank, com base na história de usuário "signUp_feature". Os testes cobrem cenários de fluxo feliz, validação de campos, tratamento de erros, navegação e elementos da interface do usuário.

## 2. Casos de Teste

### TC01: Cadastro com Dados Válidos (Fluxo Feliz)
**ID:** TC01  
**Título:** Cadastro de usuário com dados válidos  
**Descrição:** Verificar que um novo usuário pode ser cadastrado com sucesso quando todos os campos obrigatórios são preenchidos corretamente.  
**Pré-condições:**  
- O usuário está na página inicial do Bugbank (https://bugbank.netlify.app/)  
- O usuário clicou na opção "Registrar"  
**Passos:**  
1. Navegar para https://bugbank.netlify.app/  
2. Clicar no link/botão "Registrar"  
3. Preencher o campo "Nome" com um nome válido (ex: "Maria Silva")  
4. Preencher o campo "E-mail" com um e-mail válido e único (ex: "maria.silva@email.com")  
5. Preencher o campo "Senha" com uma senha válida (ex: "Senha@123")  
6. Preencher o campo "Confirmar Senha" com a mesma senha  
7. Clicar no botão "Cadastrar"  
**Dados de Teste:**  
- Nome: "Maria Silva"  
- E-mail: "maria.silva@email.com" (deve ser único para cada execução)  
- Senha: "Senha@123"  
- Confirmar Senha: "Senha@123"  
**Resultados Esperados:**  
- O sistema deve exibir uma mensagem de sucesso (ex: "Cadastro realizado com sucesso!")  
- O usuário deve ser redirecionado para a página de login ou uma página de boas-vindas (conforme especificação do fluxo pós-cadastro)  
- O formulário deve ser limpo ou permanecido com os dados (dependendo da implementação)  
**Pós-condições:**  
- O novo usuário deve estar registrado no sistema (pode ser verificado via backend ou tentativa de login)

### TC02: Campos Obrigatórios Vazios
**ID:** TC02  
**Título:** Submissão do formulário com todos os campos obrigatórios vazios  
**Descrição:** Verificar que o sistema impede o cadastro e exibe mensagens de erro quando todos os campos obrigatórios estão vazios.  
**Pré-condições:**  
- O usuário está na página de cadastro  
**Passos:**  
1. Navegar para a página de cadastro  
2. Deixar todos os campos obrigatórios (Nome, E-mail, Senha, Confirmar Senha) vazios  
3. Clicar no botão "Cadastrar"  
**Dados de Teste:**  
- Todos os campos: vazio  
**Resultados Esperados:**  
- O sistema não deve permitir a submissão do formulário  
- Devem ser exibidas mensagens de erro específicas ao lado de cada campo vazio (ex: "O campo Nome é obrigatório", "O campo E-mail é obrigatório", etc.)  
- Os campos devem destacar visualmente o erro (ex: borda vermelha, ícone de erro)  
**Pós-condições:**  
- O formulário permanece na página de cadastro com os erros exibidos

### TC03: E-mail Inválido (Sem @)
**ID:** TC03  
**Título:** Tentativa de cadastro com e-mail no formato inválido (sem @)  
**Descrição:** Verificar que o sistema impede o cadastro e exibe mensagem de erro quando o campo e-mail não contém o caractere "@".  
**Pré-condições:**  
- O usuário está na página de cadastro  
- Os outros campos obrigatórios estão preenchidos com dados válidos  
**Passos:**  
1. Navegar para a página de cadastro  
2. Preencher o campo "Nome" com dados válidos (ex: "João Silva")  
3. Preencher o campo "E-mail" com um e-mail inválido (ex: "joaosilvaemail.com")  
4. Preencher os campos "Senha" e "Confirmar Senha" com dados válidos e correspondentes (ex: "Senha@123")  
5. Clicar no botão "Cadastrar"  
**Dados de Teste:**  
- Nome: "João Silva"  
- E-mail: "joaosilvaemail.com" (sem @)  
- Senha: "Senha@123"  
- Confirmar Senha: "Senha@123"  
**Resultados Esperados:**  
- O sistema não deve permitir a submissão do formulário  
- Deve ser exibida uma mensagem de erro específica para o campo e-mail (ex: "E-mail inválido", "Por favor, insira um e-mail válido")  
- Os outros campos devem permanecer com os valores preenchidos  
**Pós-condições:**  
- O formulário permanece na página de cadastro com o erro de e-mail exibido

### TC04: Campos com Apenas Espaços em Branco
**ID:** TC04  
**Título:** Preenchimento do campo Nome com apenas espaços em branco  
**Descrição:** Verificar que o sistema trata campos preenchidos apenas com espaços como vazios e exibe mensagem de erro obrigatório.  
**Pré-condições:**  
- O usuário está na página de cadastro  
- Os outros campos obrigatórios estão preenchidos com dados válidos  
**Passos:**  
1. Navegar para a página de cadastro  
2. Preencher o campo "Nome" com apenas espaços (ex: "   ")  
3. Preencher o campo "E-mail" com dados válidos (ex: "joao@email.com")  
4. Preencher os campos "Senha" e "Confirmar Senha" com dados válidos e correspondentes  
5. Clicar no botão "Cadastrar"  
**Dados de Teste:**  
- Nome: "   " (apenas espaços)  
- E-mail: "joao@email.com"  
- Senha: "Senha@123"  
- Confirmar Senha: "Senha@123"  
**Resultados Esperados:**  
- O sistema deve considerar o campo Nome como vazio  
- Não deve permitir a submissão do formulário  
- Deve exibir a mensagem de erro: "O campo Nome é obrigatório" (ou similar) ao lado do campo Nome  
- Os outros campos devem permanecer com os valores preenchidos  
**Pós-condições:**  
- O formulário permanece na página de cadastro com o erro de nome exibido

### TC05: Nome com Caracteres Especiais ou Números
**ID:** TC05  
**Título:** Tentativa de cadastro com nome contendo caracteres especiais ou números  
**Descrição:** Verificar que o sistema impede o cadastro quando o campo nome contém caracteres não permitidos (especiais ou números), conforme regras de validação do nome.  
**Pré-condições:**  
- O usuário está na página de cadastro  
- Os outros campos obrigatórios estão preenchidos com dados válidos  
**Passos:**  
1. Navegar para a página de cadastro  
2. Preencher o campo "Nome" com caracteres especiais e números (ex: "João123!")  
3. Preencher o campo "E-mail" com dados válidos (ex: "joao@email.com")  
4. Preencher os campos "Senha" e "Confirmar Senha" com dados válidos e correspondentes  
5. Clicar no botão "Cadastrar"  
**Dados de Teste:**  
- Nome: "João123!"  
- E-mail: "joao@email.com"  
- Senha: "Senha@123"  
- Confirmar Senha: "Senha@123"  
**Resultados Esperados:**  
- O sistema não deve permitir a submissão do formulário  
- Deve exibir uma mensagem de erro específica para o campo nome (ex: "O nome não pode conter números ou caracteres especiais", "Por favor, insira apenas letras e espaços")  
- Os outros campos devem permanecer com os valores preenchidos  
**Pós-condições:**  
- O formulário permanece na página de cadastro com o erro de nome exibido

### TC06: Exceder Limite de Caracteres no Nome
**ID:** TC06  
**Título:** Tentativa de cadastro excedendo o limite de caracteres no campo nome  
**Descrição:** Verificar que o sistema impede o cadastro quando o campo nome excede o limite máximo de caracteres permitido.  
**Pré-condições:**  
- O usuário está na página de cadastro  
- Os outros campos obrigatórios estão preenchidos com dados válidos  
**Passos:**  
1. Navegar para a página de cadastro  
2. Preencher o campo "Nome" com um texto de 300 caracteres (ex: "a" repetido 300 vezes)  
3. Preencher o campo "E-mail" com dados válidos (ex: "test@email.com")  
4. Preencher os campos "Senha" e "Confirmar Senha" com dados válidos e correspondentes  
5. Clicar no botão "Cadastrar"  
**Dados de Teste:**  
- Nome: string de 300 caracteres  
- E-mail: "test@email.com"  
- Senha: "Senha@123"  
- Confirmar Senha: "Senha@123"  
**Resultados Esperados:**  
- O sistema não deve permitir a submissão do formulário  
- Deve exibir uma mensagem de erro específica para o campo nome (ex: "O nome não pode exceder 100 caracteres", "Limite máximo de caracteres excedido")  
- Os outros campos devem permanecer com os valores preenchidos  
**Pós-condições:**  
- O formulário permanece na página de cadastro com o erro de nome exibido

### TC07: E-mail Duplicado (Cenário Adicional)
**ID:** TC07  
**Título:** Tentativa de cadastro com e-mail já existente no sistema  
**Descrição:** Verificar que o sistema impede o cadastro quando o e-mail informado já está cadastrado.  
**Pré-condições:**  
- O usuário está na página de cadastro  
- Existe um usuário no sistema com o e-mail a ser utilizado (pré-cadastrado via backend ou outro teste)  
**Passos:**  
1. Navegar para a página de cadastro  
2. Preencher todos os campos com dados válidos, utilizando um e-mail que já exista no sistema  
3. Clicar no botão "Cadastrar"  
**Dados de Teste:**  
- Nome: "Usuario Existente"  
- E-mail: "existente@email.com" (já cadastrado)  
- Senha: "Senha@123"  
- Confirmar Senha: "Senha@123"  
**Resultados Esperados:**  
- O sistema não deve permitir a submissão do formulário  
- Deve exibir uma mensagem de erro indicando que o e-mail já está em uso (ex: "Este e-mail já está cadastrado", "Escolha outro e-mail")  
- Os campos devem permanecer com os valores preenchidos  
**Pós-condições:**  
- O formulário permanece na página de cadastro com o erro de e-mail duplicado exibido  

### TC08: Navegação da Página Inicial para a Página de Cadastro
**ID:** TC08  
**Título:** Verificação da navegação da página inicial para a página de cadastro  
**Descrição:** Verificar que o usuário pode acessar a página de cadastro a partir da página inicial através do link "Registrar".  
**Pré-condições:**  
- O usuário está na página inicial do Bugbank  
**Passos:**  
1. Navegar para https://bugbank.netlify.app/  
2. Localizar o link/botão "Registrar"  
3. Clicar no link/botão "Registrar"  
**Dados de Teste:**  
- Nenhum  
**Resultados Esperados:**  
- A página de cadastro deve ser carregada  
- A URL deve corresponder à página de cadastro (ex: https://bugbank.netlify.app/register ou similar)  
- O formulário de cadastro deve estar visível com todos os campos obrigatórios (Nome, E-mail, Senha, Confirmar Senha) e o botão "Cadastrar"  
**Pós-condições:**  
- O usuário está na página de cadastro pronto para preencher o formulário  

### TC09: Validação de Elementos da UI na Página de Cadastro
**ID:** TC09  
**Título:** Validação dos elementos da interface na página de cadastro  
**Descrição:** Verificar que todos os elementos esperados da interface estão presentes e corretos na página de cadastro.  
**Pré-condições:**  
- O usuário está na página de cadastro  
**Passos:**  
1. Navegar para a página de cadastro  
2. Inspecionar visualmente a página  
**Dados de Teste:**  
- Nenhum  
**Resultados Esperados:**  
- Deve estar presente um título ou indicativo de que a página é para cadastro (ex: "Cadastre-se", "Registrar")  
- Devem estar presentes os seguintes campos de input:  
  - Nome (tipo texto)  
  - E-mail (tipo e-mail)  
  - Senha (tipo senha)  
  - Confirmar Senha (tipo senha)  
- Cada campo deve ter um label associado descriptivo  
- Deve estar presente um botão de submissão com o texto "Cadastrar"  
- O botão deve estar habilitado por padrão  
- Os campos devem ter placeholders ou exemplos de formato (se aplicável)  
- A página deve ser responsiva e adaptar-se a diferentes tamanhos de tela  
**Pós-condições:**  
- Nenhum  

## 3. Considerações Adicionais
- **Dados de Teste Únicos:** Para testes que envolvem submissão de formulário (como TC01 e TC07), é necessário utilizar dados de teste únicos (especialmente e-mail) para evitar conflitos com execuções anteriores. Suger-se usar timestamps ou números aleatórios nos e-mails (ex: "teste{timestamp}@email.com").
- **Ambiente de Teste:** Os testes devem ser executados em um ambiente de teste dedicado, não no ambiente de produção.
- **Automação:** Este plano de teste pode servir como base para a criação de testes automatizados usando Playwright, conforme indicado nas notas técnicas da história de usuário.
- **Limites de Outros Campos:** Embora a história de usuário não especifique limites para outros campos (e-mail, senha), recomenda-se verificar os limites máximos e mínimos desses campos durante os testes exploratórios.
- **Mensagens de Erro:** Validar que as mensagens de erro são claras, amigáveis e ajudam o usuário a corrigir o problema.

## 4. Conclusão
Este plano de teste cobre todos os critérios de aceitação especificados na história de usuário, além de cenários adicionais comuns em funcionalidades de cadastro. A execução desses testes garantirá que a funcionalidade de sign up do Bugbank seja robusto, seguro e forneça uma boa experiência ao usuário.

--- 
**Fonte:** Baseado na história de usuário "signUp_feature" e nas notas técnicas fornecidas.  
**Localização do Plano:** Este plano deve ser salvo como `specs/bugbank-test-plan.md` no diretório do projeto.  
**Data:** 2026-08-25  
**Elaborado por:** Claude Guide Agent  

Sources:
- https://bugbank.netlify.app/ (application under test, referenced in user story)
- user-stories/signUp_feature.md (user story source)