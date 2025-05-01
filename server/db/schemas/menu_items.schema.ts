import type { AnyPgColumn } from 'drizzle-orm/pg-core'
import { pgTable, serial, text, integer, timestamp, boolean } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const menuItems = pgTable('menu_items', {
  id: serial('id').primaryKey(),
  label: text('label').notNull(),
  icon: text('icon'),
  to: text('to').notNull(),
  parent_id: integer('parent_id').references((): AnyPgColumn => menuItems.id),
  order: integer('order').notNull().default(0),
  active: boolean('active').notNull().default(true),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
})

export const menuItemsRelations = relations(menuItems, ({ one, many }) => ({
  children: many(menuItems, {
    relationName: 'parent_child',
  }),
  parent: one(menuItems, {
    fields: [menuItems.parent_id],
    references: [menuItems.id],
    relationName: 'parent_child',
  }),
}))
