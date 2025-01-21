import { Hono } from 'hono'
import { Env, Variables } from './types'
import { injectDb, cors, injectStripe } from './middleware'
import checkoutRouter from './routes/checkout-router'


const app = new Hono<{ Bindings: Env, Variables: Variables }>()

// Apply middleware
app.use('*', injectDb)
app.use('*', cors)
app.use('*', injectStripe)

app.route('/checkout', checkoutRouter)

export default app
