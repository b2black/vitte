import { eq } from 'drizzle-orm'
import { defineEventHandler, createError, H3Error } from 'h3'
import { tokenGenerator } from '~/server/providers/TokenGenerator'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.token) {
    throw createError({ statusCode: 400, message: 'Необходимо указать токен' })
  }

  try {
    const result = await tokenGenerator.validate(body.token as string, process.env.JWT_SECRET as string) as { email: string }
    const db = useDrizzle()
    const userQuery = await db.select().from(tables.users).where(eq(tables.users.email, result.email))
    const user = userQuery[0]

    if (!user) {
      throw createError({ statusCode: 404, message: 'Пользователь не найден' })
    }

    if (user.confirmed) {
      throw createError({ statusCode: 400, message: 'Пользователь уже подтвержден' })
    }

    await db.update(tables.users).set({ confirmed: true }).where(eq(tables.users.email, result.email))

    return {
      message: `Пользователь ${user.first_name} ${user.last_name} успешно подтвержден. Пожалуйста авторизуйтесь`,
    }
  }
  catch (error: unknown) {
    if (error instanceof H3Error) {
      throw error
    }
    else {
      throw createError({ statusCode: 400, message: 'Неизвестная ошибка', data: error })
    }
  }
})
