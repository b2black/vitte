import type { AnyPgColumn } from 'drizzle-orm/pg-core'
import type { SQL } from 'drizzle-orm'
import { sql } from 'drizzle-orm'

export function lower(email: AnyPgColumn): SQL {
  return sql`lower(${email})`
}
