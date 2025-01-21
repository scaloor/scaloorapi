import { MiddlewareHandler } from 'hono'

// CORS middleware
export const cors: MiddlewareHandler = async (c, next) => {
    // TODO: Add dynamic CORS headers for users to secure their checkout pages
  
    c.header('Access-Control-Allow-Origin', '*')
    c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    c.header('Access-Control-Allow-Headers', 'Content-Type')
    
    if (c.req.method === 'OPTIONS') {
      return c.text('')
    }
    
    await next()
  }