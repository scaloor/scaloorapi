import { Hono } from 'hono'

const app = new Hono()

// Add CORS middleware
app.use('*', async (c, next) => {
  // Add CORS headers
  c.header('Access-Control-Allow-Origin', '*')
  c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  c.header('Access-Control-Allow-Headers', 'Content-Type')
  
  // Handle OPTIONS request
  if (c.req.method === 'OPTIONS') {
    return c.text('')
  }
  
  await next()
})

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
