import 'dotenv/config';
import {drizzle} from 'drizzle-orm/node-postgres';
import {Users} from '~/server/db/schemas/user.schema';
import {Roles} from '~/server/db/schemas/roles.schema';

export {sql, eq, and, or} from 'drizzle-orm'

export const tables = {
    Users,
    Roles,
}

export function useDrizzle() {
    return drizzle(process.env.DATABASE_URL!);
}
