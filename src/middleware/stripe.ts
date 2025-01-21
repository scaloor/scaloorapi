import { MiddlewareHandler } from 'hono'
import type { Env, Variables } from '../types'
import { createStripe } from '../lib/stripe'

export const injectStripe: MiddlewareHandler<{ Bindings: Env, Variables: Variables }> = async (c, next) => {
    if (!c.env.STRIPE_SECRET_KEY) {
        throw new Error('STRIPE_SECRET_KEY is not defined')
    }
    
    const stripe = createStripe(c.env.STRIPE_SECRET_KEY)
    c.set('stripe', stripe)
    await next()
} 