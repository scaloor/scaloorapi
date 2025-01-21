import { drizzle } from 'drizzle-orm/postgres-js'
import type { Context } from 'hono'
import type Stripe from 'stripe'

export type Env = {
  DATABASE_URL: string
  STRIPE_PUBLIC_KEY: string
  STRIPE_SECRET_KEY: string
}

export type Variables = {
  db: ReturnType<typeof drizzle>
  stripe: Stripe
}

export type HonoContext = Context<{ Bindings: Env, Variables: Variables }>