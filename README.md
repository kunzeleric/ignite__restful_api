# API Restful - Ignite

API desenvolvida durante trilha de especialização em Node.

## TECNOLOGIAS

- Fastify
- Typescript
- Supertest
- Vitest
- Knex & SQLite
- Zod

## REQUISITOS FUNCIONAIS

[x] O usuário deve poder criar uma nova transação;
[x] O usuário deve poder obter um resumo da sua conta;
[x] O usuário deve poder listar todas transações que já ocorreram;
[x] O usuário deve poder visualizar uma transação única;

## REGRAS DE NEGÓCIO

[x] A transação pode ser do tipo crédito que somará ao valor total, ou débito que subtrairá;
[x] Deve ser possível identificarmos o usuário entre as requisições;
[x] O usuário só pode visualizar transações as quais ele criou;