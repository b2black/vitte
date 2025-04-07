import {eq} from 'drizzle-orm';
import {createInsertSchema} from 'drizzle-valibot';
import {parse} from 'valibot';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    if (!body.email || !body.password || !body.first_name || !body.last_name) {
        throw createError({statusCode: 400, message: 'Не заполнены обязательные поля'});
    }

    const defaultRoleId = await useDrizzle().select().from(tables.Roles).where(eq(tables.Roles.alias, 'student'));

    if (!defaultRoleId.length) {
        throw createError({statusCode: 404, message: 'Стандартная роль не найдена'});
    }

    body.role_id = defaultRoleId[0].id;

    const userSchema = createInsertSchema(tables.Users);

    let parsed;
    try {
        parsed = parse(userSchema, body);
    } catch (error: unknown) {
        throw createError({statusCode: 400, message: 'Ошибка валидации', data: error});
    }

    const res = await useDrizzle().insert(tables.Users).values(parsed);

    return {
        res,
    };
});
