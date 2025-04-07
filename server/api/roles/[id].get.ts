import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const roleId = Number(event.context.params?.id);

  if (!roleId) {
    throw createError({ statusCode: 400, message: "ID роли обязателен в URL" });
  }

  const role = await useDrizzle()
      .select({
        id: tables.Roles.id,
        name: tables.Roles.name,
        alias: tables.Roles.alias,
      })
      .from(tables.Roles)
      .where(eq(tables.Roles.id, Number(roleId)))
      .limit(1);

  if (role.length === 0) {
    throw createError({ statusCode: 404, message: "Роль не найдена" });
  }

  return role[0];
});
