import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
    const userId = event.context.params?.id;

    if (!userId) {
        throw createError({ statusCode: 400, message: "ID пользователя обязателен в URL" });
    }

    const user = await useDrizzle()
        .select({
            id: tables.Users.id,
            first_name: tables.Users.first_name,
            last_name: tables.Users.last_name,
            email: tables.Users.email,
            role_id: tables.Users.role_id,
            role_alias: tables.Roles.alias,
            role_name: tables.Roles.name,
        })
        .from(tables.Users)
        .leftJoin(tables.Roles, eq(tables.Users.role_id, tables.Roles.id))
        .where(eq(tables.Users.id, Number(userId)))
        .limit(1);

    if (user.length === 0) {
        throw createError({ statusCode: 404, message: "Пользователь не найден" });
    }

    return user[0];
});
