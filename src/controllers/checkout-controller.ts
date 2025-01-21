import type { HonoContext } from '../types'
import { CheckoutModel } from '../models/checkout-model'
import type { drizzle } from 'drizzle-orm/postgres-js'

export class CheckoutController {

    /**
     * Get a checkout by its id
     * @param c - The Hono context
     * @returns The checkout
     */
    static async getCheckout(c: HonoContext) {
        const db = c.get('db') as ReturnType<typeof drizzle>
        const checkoutModel = new CheckoutModel(db)
        const dbCheckout = await checkoutModel.getCheckout(c.req.param('id'))
        if (!dbCheckout) return c.json({ error: 'Checkout not found' }, 404)
        return dbCheckout
    }
}
