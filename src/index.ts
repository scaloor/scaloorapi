import { checkout } from './db/schema'
import { eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { Env, Variables } from './types'
import { injectDb, cors } from './middleware'

const app = new Hono<{ Bindings: Env, Variables: Variables }>()

// Apply middleware
app.use('*', injectDb)
app.use('*', cors)

app.get('/', async (c) => {
  const db = c.get('db')
  const dbCheckout = await db.select().from(checkout).where(eq(checkout.id, 'chk_a8aaosw7fd6xpa9iimitwdy0'))
  return c.text(`${JSON.stringify(dbCheckout)}`)
})

export default app
