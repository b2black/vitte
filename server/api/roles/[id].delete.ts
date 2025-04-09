import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const roleId = Number(event.context.params?.id)

  if (isNaN(roleId)) {
    throw createError({ statusCode: 400, message: 'ID роли обязателен в URL' })
  }

  const result = await useDrizzle()
    .delete(tables.Roles)
    .where(eq(tables.Roles.id, roleId))

  if (result.rowCount === 0) {
    throw createError({ statusCode: 404, message: 'Роль не найдена' })
  }

  return {
    message: 'Роль успешно удалена',
    deleted: result.rowCount,
  }
})
