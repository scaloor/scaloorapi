import { Hono } from 'hono'
import { Env, Variables } from './types'
import { injectDb, cors } from './middleware'
import checkoutController from './controllers/checkout-controller'

const app = new Hono<{ Bindings: Env, Variables: Variables }>()

// Apply middleware
app.use('*', injectDb)
app.use('*', cors)

app.route('/checkout', checkoutController)

export default app
