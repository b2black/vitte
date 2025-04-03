import {pgTable, serial, text, integer, timestamp} from 'drizzle-orm/pg-core';
import {Roles} from './roles.schema';

export const Users = pgTable(
    'users',
    {
        id: serial("id").primaryKey(),
        first_name: text("first_name").notNull(),
        last_name: text("last_name").notNull(),
        password: text("password").notNull(),
        role_id: integer("role_id").notNull().references(() => Roles.id),
        created_at: timestamp('created_at').defaultNow().notNull(),
        updated_at: timestamp('updated_at').defaultNow().$onUpdateFn(() => new Date()).notNull(),
    }
);
