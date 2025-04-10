import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const userId = event.context.params?.id

  if (!userId) {
    throw createError({ statusCode: 400, message: 'ID пользователя обязателен в URL' })
  }

  const user = await useDrizzle()
    .select({
      id: tables.users.id,
      first_name: tables.users.first_name,
      last_name: tables.users.last_name,
      email: tables.users.email,
      role_id: tables.users.role_id,
      role_alias: tables.roles.alias,
      role_name: tables.roles.name,
    })
    .from(tables.users)
    .leftJoin(tables.roles, eq(tables.users.role_id, tables.roles.id))
    .where(eq(tables.users.id, Number(userId)))
    .limit(1)

  if (user.length === 0) {
    throw createError({ statusCode: 404, message: 'Пользователь не найден' })
  }

  return user[0]
})
