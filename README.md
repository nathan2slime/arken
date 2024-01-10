<div align="center">
  <h2>Sample</h2>
</div>

```
Name: Francisco Cajlon Jhonathan Moura Batista
Email: nathan3boss@gmail.com
LinkedIn: https://www.linkedin.com/in/nathan2slime/
Portfolio: https://www.nathan3boss.dev/
```

### 💻 Prerequisites

Você precisa ter as seguintes ferramentas a seguir, instaladas na sua máquina.

- [Node.js](https://nodejs.org/)

  > Use versão 18

- [Yarn](https://yarnpkg.com/)
  > Use a versão PKG
- [Git](https://git-scm.com/)
- [PostgreSQL](https://www.postgresql.org/)

### 💾 Pacotes

> Esse projeto usa uma configuração de monorepo, a tabela a seguir contém informações sobre as bases de códigos

| Nome            | Descrição                                           |
| --------------- | --------------------------------------------------- |
| `@ark/api`      | API para extração e registro de dados das planilhas |
| `@ark/logger`   | Pacote com logger customizado                       |
| `@ark/tsconfig` | Pacote com arquivos de configuração de TypeScript   |
| `@ark/web`      | Aplicação Vue.js                                    |
| `@ark/database` | Pacote com modelos de tabelas do banco de dados     |
| `@ark/env`      | Pacote pra validar e carregar variáveis de ambiente |

### 👾 Variavéis de ambiente

> Aqui está um exemplo das variavéis de ambiente desse projeto

```
## Configurações do PostgreSQL
POSTGRES_USER=root
POSTGRES_PASSWORD=123456
POSTGRES_DB=arken
POSTGRES_HOST=postgres
POSTGRES_PORT=5432

## Portas
APP_API_PORT=8585 ## Diz qual porta a @ark/api vai rodar
VITE_APP_WEB_PORT=3000  ## Diz qual porta a @ark/web vai rodar
VITE_APP_API_URL=http://localhost:8585 ## Diz qual endereço que o @ark/api está rodando
```

### 🧁 Setup

Baixe o repositório usando Git

```
git clone https://github.com/nathan2slime/arken.git
```

Entre no diretório de projeto.

```
cd arken
```

### 🚀 Running

> Os comandos a seguir são executados no diretório pai

- Usando Docker

  > Rode o comando abaixo, certifique-se de que o arquivo `.env.prod` existe.

  ```
  docker compose up
  ```

- No Docker

  Crie um arquivo `.env` no modelo mostrado na seção de variáveis de ambiente.

  > Rode o seguinte comando para instalar as dependências

  ```
  yarn install
  ```

  > Rode o seguinte comando para fazer build

  ```
  yarn dotenv -e .env -- yarn build
  ```

  > Rode a @ark/api, certifique-se que o banco de dados esteja rodando na sua máquina

  ```
  yarn dev --filter=@ark/api
  ```

  > Rode a aplicação Vue.js

  ```
  yarn dev --filter=@ark/web
  ```

### 🔖 Docs

A documentação da @ark/api está disponivel no path `/docs`
