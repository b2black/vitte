import { pgTable, serial, text, integer, uniqueIndex, timestamp, boolean } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { users } from './users.schema'
import { services } from './services.schema'

export const applications = pgTable(
  'applications',
  {
    id: serial('id').primaryKey(),
    user_id: integer('user_id').references(() => users.id),
    service_id: integer('service_id').notNull().references(() => services.id),
    name: text('name').notNull(),
    email: text('email').notNull(),
    message: text('message'),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().$onUpdateFn(() => new Date()).notNull(),
    confirmed: boolean().default(false).notNull(),
  },
  table => [
    uniqueIndex('email_service_unique').on(table.email, table.service_id),
  ],
)

export const applicationsRelations = relations(applications, ({ one }) => ({
  user: one(users, { fields: [applications.user_id], references: [users.id] }),
  service: one(services, { fields: [applications.service_id], references: [services.id] }),
}))
