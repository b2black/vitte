import { pgTable, serial, text, timestamp, boolean, integer } from 'drizzle-orm/pg-core'

export const services = pgTable('services', {
  id: serial('id').primaryKey(),
  label: text('title').notNull(),
  alias: text('alias').notNull().unique(),
  description: text('description'),
  active: boolean('active').default(false).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().$onUpdateFn(() => new Date()).notNull(),
  icon: text('icon'),
  order: integer('order').notNull().default(0),
  image: text('image'),
})
