import { checkout, SelectCheckout } from "../db/schema";
import { eq } from 'drizzle-orm'
import { BaseModel } from './base-model'

export class CheckoutModel extends BaseModel {

    /**
     * Get a checkout by its id
     * @param id - The id of the checkout
     * @returns The checkout
     */
    async getCheckout(id: string) {
        const dbCheckout = await this.db.select().from(checkout).where(eq(checkout.id, id)).then(res => res[0])
        return dbCheckout
    }
}