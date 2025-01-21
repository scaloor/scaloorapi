import { Hono } from 'hono'
import type { Env, Variables } from '../types'
import { checkoutView } from '../views/checkout-view'

const checkoutRouter = new Hono<{ Bindings: Env, Variables: Variables }>()

// Map routes to controller methods
checkoutRouter.get('/:id', async (c) => {
    const result = await checkoutView(c)
    return c.html(result)
})

export default checkoutRouter