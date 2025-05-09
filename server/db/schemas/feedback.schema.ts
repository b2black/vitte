import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const feedback = pgTable(
  'feedback',
  {
    id: serial('id').primaryKey(),
    name: text('first_name').notNull(),
    email: text('email').notNull(),
    message: text('message').notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
  },
)
