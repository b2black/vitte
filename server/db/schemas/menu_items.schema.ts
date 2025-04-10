import type { AnyPgColumn } from 'drizzle-orm/pg-core'
import { pgTable, serial, text, integer, timestamp, boolean } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const menuItems = pgTable('menu_items', {
  id: serial('id').primaryKey(),
  label: text('label').notNull(),
  icon: text('icon'),
  to: text('to').notNull(),
  parentId: integer('parent_id').references((): AnyPgColumn => menuItems.id),
  order: integer('order').notNull().default(0),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const menuItemsRelations = relations(menuItems, ({ one, many }) => ({
  children: many(menuItems, {
    relationName: 'parent_child',
  }),
  parent: one(menuItems, {
    fields: [menuItems.parentId],
    references: [menuItems.id],
    relationName: 'parent_child',
  }),
}))
