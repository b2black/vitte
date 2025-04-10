import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const roles = pgTable('roles', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  alias: text('alias').unique().notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().$onUpdateFn(() => new Date()).notNull(),
})
