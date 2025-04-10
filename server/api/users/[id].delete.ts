import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const userId = event.context.params?.id

  if (!userId) {
    throw createError({ statusCode: 400, message: 'ID пользователя обязателен в URL' })
  }

  const result = await useDrizzle()
    .delete(tables.users)
    .where(eq(tables.users.id, Number(userId)))

  if (result.rowCount === 0) {
    throw createError({ statusCode: 404, message: 'Пользователь не найден' })
  }

  return {
    message: 'Пользователь успешно удален',
    deleted: result.rowCount,
  }
})
