import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Users } from '../db/schemas/user.schema'
import { Roles } from '../db/schemas/roles.schema'

export const tables = {
  Users,
  Roles,
}

export function useDrizzle() {
  return drizzle(process.env.DATABASE_URL ?? '')
}
