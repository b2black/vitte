import { pgTable, serial, text, integer, timestamp, uniqueIndex } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { roles } from './roles.schema'
import { lower } from './helpers'

export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    first_name: text('first_name').notNull(),
    last_name: text('last_name').notNull(),
    email: text('email').notNull(),
    password: text('password').notNull(),
    role_id: integer('role_id').notNull().references(() => roles.id),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().$onUpdateFn(() => new Date()).notNull(),
  },
  table => [
    uniqueIndex('emailUniqueIndex').on(lower(table.email)),
  ],
)

export const usersRelations = relations(users, ({ one }) => ({
  role: one(roles, {
    fields: [users.role_id],
    references: [roles.id],
  }),
}))
