// eslint-disable-next-line
import { Knex } from 'knex'

// ajuda o knex a identificar quais tabelas e quais campos\tipos de dados
declare module 'knex/types/tables' {
  export interface Tables {
    transactions: {
      id: string
      title: string
      amount: number
      created_at: string
      session_id?: string
    }
  }
}
