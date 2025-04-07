import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-valibot";
import { parse } from "valibot";
import { hash } from "bcrypt";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    if (!body.email || !body.password || !body.first_name || !body.last_name) {
        throw createError({ statusCode: 400, message: "Не заполнены обязательные поля" });
    }

    const db = useDrizzle();

    const existingUser = await db
        .select()
        .from(tables.Users)
        .where(eq(tables.Users.email, body.email.toLowerCase()));

    if (existingUser.length) {
        throw createError({ statusCode: 409, message: "Email уже используется" });
    }

    const defaultRoleQuery = await db
        .select()
        .from(tables.Roles)
        .where(eq(tables.Roles.alias, "student"));

    if (!defaultRoleQuery.length) {
        throw createError({ statusCode: 404, message: "Стандартная роль не найдена" });
    }

    body.role_id = defaultRoleQuery[0].id;

    const saltRounds = 10;
    body.password = await hash(body.password, saltRounds);


    const userSchema = createInsertSchema(tables.Users);
    let validatedBody;
    try {
        validatedBody = parse(userSchema, body);
    } catch (error: unknown) {
        throw createError({ statusCode: 400, message: "Ошибка валидации", data: error });
    }

    try {
        const result = await db.insert(tables.Users).values(validatedBody).returning();
        return {
            success: true,
            message: "Пользователь успешно зарегистрирован",
            user: {
                id: result[0].id,
                first_name: body.first_name,
                last_name: body.last_name,
                email: body.email,
                role_id: body.role_id,
            },
        };
    } catch (error: unknown) {
        throw createError({ statusCode: 400, message: "Ошибка добавления данных в базу", data: error });
    }
});
