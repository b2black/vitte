import {pgTable, serial, text, timestamp} from 'drizzle-orm/pg-core';

export const roles = pgTable('roles', {
    id: serial('id').primaryKey(),
    role: text('role'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type rolesSchemaInsert = typeof roles.$inferInsert;
export type rolesSchemaSelect = typeof roles.$inferSelect;
