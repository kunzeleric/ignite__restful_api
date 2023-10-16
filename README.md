# API Restful - Ignite

API desenvolvida durante trilha de especialização em Node.
Feito com o propósito de reforçar aprendizado de Node com um framework de integração fácil com Typescript (Fastify), criação de banco de dados e migrações e também a realização de testes de integração.

## TECNOLOGIAS

- Fastify
- Typescript
- Supertest
- Vitest
- Knex & SQLite
- Zod

## REQUISITOS FUNCIONAIS

- O usuário deve poder criar uma nova transação;
- O usuário deve poder obter um resumo da sua conta;
- O usuário deve poder listar todas transações que já ocorreram;
- O usuário deve poder visualizar uma transação única;

## REGRAS DE NEGÓCIO

- A transação pode ser do tipo crédito que somará ao valor total, ou débito que subtrairá;
- Deve ser possível identificarmos o usuário entre as requisições;
- O usuário só pode visualizar transações as quais ele criou;