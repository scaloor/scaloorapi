import { MiddlewareHandler } from 'hono'
import type { Env, Variables } from '../types'
import { createDb } from '../db'

export const injectDb: MiddlewareHandler<{ Bindings: Env, Variables: Variables }> = async (c, next) => {
  const db = createDb(c.env.DATABASE_URL)
  c.set('db', db)
  await next()
}