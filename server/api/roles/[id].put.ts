import { createUpdateSchema } from "drizzle-valibot";
import { parse, partial } from "valibot";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
    const roleId = Number(event.context.params?.id);
    const body = await readBody(event);

    if (!roleId) {
        throw createError({ statusCode: 400, message: "ID роли обязателен в URL" });
    }

    if (Object.keys(body).length === 0) {
        throw createError({ statusCode: 400, message: "Не указаны поля для обновления" });
    }

    const roleUpdateSchema = partial(createUpdateSchema(tables.Roles));

    let parsed;
    try {
        parsed = parse(roleUpdateSchema, body);
    } catch (error: unknown) {
        throw createError({ statusCode: 400, message: "Ошибка валидации", data: error });
    }

    const result = await useDrizzle()
        .update(tables.Roles)
        .set(parsed)
        .where(eq(tables.Roles.id, roleId));

    if (result.rowCount === 0) {
        throw createError({ statusCode: 404, message: "Роль не найдена или изменения не были внесены" });
    }

    return {
        message: "Роль успешно обновлена",
        updated: result.rowCount,
    };
});
