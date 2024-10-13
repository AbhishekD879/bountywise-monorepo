import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './../schema'
import { neon } from '@neondatabase/serverless'
const sql = neon(process.env.DB_URL!)

const db = drizzle(sql, { schema: schema })
export default db
