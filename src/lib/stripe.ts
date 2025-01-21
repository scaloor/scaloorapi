import Stripe from 'stripe'

let stripeClient: Stripe | null = null

export function createStripe(secretKey: string) {
    if (!stripeClient) {
        stripeClient = new Stripe(secretKey, {
            apiVersion: '2024-12-18.acacia',
            typescript: true,
        })
    }
    return stripeClient
}