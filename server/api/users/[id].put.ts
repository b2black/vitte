import { eq } from "drizzle-orm";
import { createUpdateSchema } from "drizzle-valibot";
import { parse, partial } from "valibot";

export default defineEventHandler(async (event) => {
    const userId = Number(event.context.params?.id);
    const body = await readBody(event);

    if (!userId) {
        throw createError({ statusCode: 400, message: "ID пользователя обязателен в URL" });
    }

    if (Object.keys(body).length === 0) {
        throw createError({ statusCode: 400, message: "Не указаны поля для обновления" });
    }

    const userUpdateSchema = partial(createUpdateSchema(tables.Users));

    let parsed;
    try {
        parsed = parse(userUpdateSchema, body);
    } catch (error: unknown) {
        throw createError({ statusCode: 400, message: "Ошибка валидации", data: error });
    }

    const result = await useDrizzle()
        .update(tables.Users)
        .set(parsed)
        .where(eq(tables.Users.id, userId));

    if (result.rowCount === 0) {
        throw createError({ statusCode: 404, message: "Пользователь не найден или изменения не были внесены" });
    }

    return {
        message: "Пользователь успешно обновлен",
        updated: result.rowCount,
    };
});
