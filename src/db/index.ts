import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

let db: ReturnType<typeof drizzle> | null = null

export function createDb(url: string) {
  if (!db) {
    const sql = postgres(url)
    db = drizzle(sql)
  }
  return db
}