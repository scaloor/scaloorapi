import { drizzle } from 'drizzle-orm/postgres-js'

export abstract class BaseModel {
    constructor(protected db: ReturnType<typeof drizzle>) {}
}