import { MiddlewareHandler } from 'hono'
import type { Env, Variables } from '../types'
import { createDb } from '../db'

export const injectDb: MiddlewareHandler<{ Bindings: Env, Variables: Variables }> = async (c, next) => {
    if (!c.env.DATABASE_URL) {
        throw new Error('DATABASE_URL is not defined')
    }
    
    const db = createDb(c.env.DATABASE_URL)
    c.set('db', db)
    await next()
}