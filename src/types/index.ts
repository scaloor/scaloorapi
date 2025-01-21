import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

export type Env = {
  DATABASE_URL: string
}

export type Variables = {
  db: ReturnType<typeof drizzle>
}