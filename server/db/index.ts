import 'dotenv/config';
import {drizzle} from 'drizzle-orm/node-postgres';

export const useDrizzle = drizzle(process.env.DATABASE_URL!);

export {usersSchemaInsert, usersSchemaSelect, users} from './schemas/user.schema';
export {rolesSchemaInsert, rolesSchemaSelect, roles} from './schemas/roles.schema';
