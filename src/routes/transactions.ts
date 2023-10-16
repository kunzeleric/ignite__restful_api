import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'node:crypto'
import { checkSessionIdExists } from '../middleware/check-session-id-exists'

// Cookies -> formas da gente manter contexto entre requisições

export async function transactionsRoutes(app: FastifyInstance) {
  // middleware declarado de forma global no contexto de rotas transaction
  // poderia ter sido criado no server.ts para servir para todas rotas possíveis
  app.addHook('preHandler', async (request) => {
    console.log(`[${request.method} ${request.url}]`)
  })

  // rota para buscar todas transações
  app.get(
    '/',
    {
      preHandler: [checkSessionIdExists], // preHandler executa antes de entrar em rotas
    },
    async (request) => {
      const { sessionId } = request.cookies

      const transactions = await knex('transactions')
        .where('session_id', sessionId)
        .select()

      return { transactions }
    },
  )

  // rota para buscar transação por ID
  app.get(
    '/:id',
    {
      preHandler: [checkSessionIdExists], // preHandler executa antes de entrar em rotas
    },
    async (request) => {
      const getTransactionParamsSchema = z.object({
        id: z.string().uuid(),
      })

      // valida o request.params com o Schema criado em Zod para receber o ID
      const { id } = getTransactionParamsSchema.parse(request.params)

      const { sessionId } = request.cookies

      // o first() faz com que o resultado não venha como array
      const transaction = await knex('transactions')
        .where({
          session_id: sessionId, // busca o ID da sessão
          id,
        })
        .first()

      return { transaction }
    },
  )

  // rota que retorna resumo de todas transações em um objeto com dado 'amount'
  app.get(
    '/summary',
    {
      preHandler: [checkSessionIdExists], // preHandler executa antes de entrar em rotas
    },
    async (request) => {
      const { sessionId } = request.cookies

      const summary = await knex('transactions')
        .where('session_id', sessionId) // busca o ID da sessão
        .sum('amount', { as: 'amount' }) // altera o nome do resultado da busca
        .first() // o first() faz com que o resultado não venha como array

      return { summary }
    },
  )

  // rota para criar uma transação com informações do req.body
  app.post('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    // valida o corpo da requisição de acordo com o schema
    // o parse lança um erro caso o schema nao seja válido
    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )

    // busca o sessionID nos cookies da requisição
    let { sessionId } = request.cookies

    // caso não exista, é criado um sessionId com expiração e para todos paths
    if (!sessionId) {
      sessionId = randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
    }

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })
}
