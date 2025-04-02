import {pgTable, serial, text, integer, timestamp} from 'drizzle-orm/pg-core';
import {roles} from './roles.schema';

export const users = pgTable(
    'users',
    {
        id: serial("id").primaryKey(),
        first_name: text("first_name").notNull(),
        last_name: text("last_name").notNull(),
        password: text("password").notNull(),
        role_id: integer("role_id").notNull().references(() => roles.id),
        created_at: timestamp('created_at').defaultNow().notNull(),
    }
);

export type usersSchemaInsert = typeof users.$inferInsert;
export type usersSchemaSelect = typeof users.$inferSelect;
