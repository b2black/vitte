import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const roleId = Number(event.context.params?.id)

  if (!roleId) {
    throw createError({ statusCode: 400, message: 'ID роли обязателен в URL' })
  }

  const role = await useDrizzle()
    .select({
      id: tables.roles.id,
      name: tables.roles.name,
      alias: tables.roles.alias,
    })
    .from(tables.roles)
    .where(eq(tables.roles.id, Number(roleId)))
    .limit(1)

  if (role.length === 0) {
    throw createError({ statusCode: 404, message: 'Роль не найдена' })
  }

  return role[0]
})
