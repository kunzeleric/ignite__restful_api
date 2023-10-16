import fastify from 'fastify'
import { transactionsRoutes } from './routes/transactions'
import cookie from '@fastify/cookie'

export const app = fastify()

app.register(cookie)
// registra rotas para transaction, utilizando prefixo da rota com nome "transactions"
app.register(transactionsRoutes, {
  prefix: '/transactions',
})
