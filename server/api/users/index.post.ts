import { eq } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-valibot';
import { parse } from 'valibot';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const defaultRoleId = await useDrizzle().select().from(tables.Roles).where(eq(tables.Roles.alias, 'student'));

    body.role_id = defaultRoleId[0].id;

    const userSchema = createInsertSchema(tables.Users);

    const parsed = parse(userSchema, body);

    const res = await useDrizzle().insert(tables.Users).values(parsed);

    return {
        res,
    };
});
