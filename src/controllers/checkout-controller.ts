
import { Hono } from 'hono'
import { CheckoutModel } from '../models/checkout-model'
import { drizzle } from 'drizzle-orm/postgres-js'
import type { Env, Variables } from '../types'

const checkoutController = new Hono<{ Bindings: Env, Variables: Variables }>()

checkoutController.get('/:id', async (c) => {
    const db = c.get('db') as ReturnType<typeof drizzle>
    const checkoutModel = new CheckoutModel(db)
    const checkout = await checkoutModel.getCheckout(c.req.param('id'))
    return c.json(checkout)
})

export default checkoutController