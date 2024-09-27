# Modoke - Aprenda sobre acessibilidade de forma rápida e divertida!

Este projeto faz parte da disciplina Projeto Integrado I, do 3° semestre do curso de Sistemas e Mídias Digitais da UFC. O **Modoke** é uma plataforma desenvolvida para ajudar desenvolvedores a aprenderem sobre acessibilidade web de forma rápida, divertida e prática. O objetivo é tornar a web mais inclusiva para todos.

## Tecnologias Utilizadas

Até o momento, o projeto foi desenvolvido utilizando as seguintes tecnologias:

- **Next.js**
- **TailwindCSS**
- **Shadcn UI**
- **Radix**
- **Axios**

## Como Iniciar

### 1. Clonar o Repositório

Antes de qualquer coisa, clone o repositório do projeto:

```bash
git clone https://github.com/borealis-smd/modoke-api.git
```

### 2. Instalar Dependências

Após clonar o repositório, instale as dependências necessárias:

```bash
npm install
```

#### ou

```bash
yarn install
```

#### ou

```bash
pnpm install
```

### 3. Iniciar o Servidor de Desenvolvimento
Depois de instalar as dependências, inicie o servidor de desenvolvimento:

```bash
npm run dev
```

#### ou

```bash
yarn dev
```

#### ou

```bash
pnpm dev
```


## Funcionalidades do Sistema

### Requisito: Landing Page
- **Local:** `app/(landing page)`
- O sistema apresenta uma landing page com uma visão geral sobre o projeto, destacando seus principais objetivos e benefícios.
- Contém uma seção que explica brevemente a importância de aplicar acessibilidade nas aplicações web.
- Permite ao usuário escolher entre realizar um teste de familiaridade ou efetuar login no sistema.

### Requisito: Teste de Familiaridade
- **Local:** `app/(enter)/signup/test`
- O sistema oferece um teste para que o usuário identifique seu nível de conhecimento sobre acessibilidade.

### Requisito: Upload de Imagens
- **Local:** `app/(main)/profile`
- O sistema permite o upload de imagens para o perfil do usuário.
- As imagens são armazenadas em nuvem.

### Requisito: Cadastro de Usuários
- **Local:** `app/(enter)/signup`
- O sistema permite o registro de novos usuários com nome, sobrenome, e-mail válido, senha e o nível obtido no teste de familiaridade.
- Também oferece a opção de cadastro utilizando uma conta Google.

### Requisito: Autenticação de Usuário
- **Local:** `app/(enter)/signin`
- Os usuários podem fazer login com e-mail e senha, ou utilizando a conta Google.
- Um token de acesso mantém a sessão aberta por 7 dias.

### Requisito: Salvamento do Progresso
- **Local:** `app/(main)/sections/[id]/unit/page.tsx`
- O sistema salva o progresso do usuário durante as lições.

### Requisito: Acesso às Lições
- **Local:** `app/(main)/learn` e `app/lesson`
- O sistema organiza o conteúdo em seções e unidades que abordam tópicos de acessibilidade.
- Cada seção contém lições organizadas por tópicos, com explicações simples e resumos teóricos.

### Requisito: Resolução de Questões
- **Local:** `app/lesson`
- O sistema permite que o usuário responda a questões de múltipla escolha relacionadas às lições.
- Feedback imediato é fornecido após a seleção de respostas, informando se a alternativa está correta ou errada.
- Um feedback geral é dado no final de cada lição, indicando a quantidade de respostas corretas e erradas, além da experiência adquirida.
- O histórico de questões resolvidas é armazenado.

### Requisito: Mascote
- O mascote aparece durante as lições, revisões e no teste de familiaridade, interagindo de forma lúdica com o usuário.

### Requisito: Perfil do Usuário
- **Local:** `app/(main)/profile`
- O sistema permite que o usuário visualize e edite seu perfil, além de acompanhar o progresso nas lições e outras atividades.
