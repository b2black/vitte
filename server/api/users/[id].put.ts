import { eq } from 'drizzle-orm'
import { createUpdateSchema } from 'drizzle-valibot'
import { parse, partial } from 'valibot'

export default defineEventHandler(async (event) => {
  const userId = Number(event.context.params?.id)
  const body = await readBody(event)

  const { user } = await requireUserSession(event)

  const validUser = userId === user.id

  if (!validUser) {
    throw createError({ statusCode: 400, message: 'Отсутствуют права на редактирование' })
  }

  if (!userId) {
    throw createError({ statusCode: 400, message: 'ID пользователя обязателен в URL' })
  }

  if (Object.keys(body).length === 0) {
    throw createError({ statusCode: 400, message: 'Не указаны поля для обновления' })
  }

  const userUpdateSchema = partial(createUpdateSchema(tables.users))

  if (body.password !== '') {
    body.password = await hashPassword(body.password)
  }
  else {
    delete body.password
  }

  let parsed
  try {
    parsed = parse(userUpdateSchema, body)
  }
  catch (error: unknown) {
    throw createError({ statusCode: 400, message: 'Ошибка валидации', data: error })
  }

  const updateResult = await useDrizzle()
    .update(tables.users)
    .set(parsed)
    .where(eq(tables.users.id, userId)).returning()

  if (!updateResult[0]) {
    throw createError({ statusCode: 404, message: 'Пользователь не найден или изменения не были внесены' })
  }

  const updatedUser = await useDrizzle().query.users.findFirst({
    where: (u, { eq }) => eq(u.id, userId),
    with: { role: true },
  })

  if (updatedUser) {
    const { password, ...userWithoutPassword } = updatedUser
    await setUserSession(event, {
      user: userWithoutPassword,
    })

    return {
      message: 'Пользователь успешно обновлен',
      updated: userWithoutPassword,
    }
  }
  else {
    throw createError({ statusCode: 404, message: 'Пользователь не найден или изменения не были внесены' })
  }
})
