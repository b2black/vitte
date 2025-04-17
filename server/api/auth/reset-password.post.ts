import { eq } from 'drizzle-orm'
import { defineEventHandler, createError, H3Error } from 'h3'
import { tokenGenerator } from '~/server/providers/TokenGenerator'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.token || !body.password) {
    throw createError({ statusCode: 400, message: 'Необходимо указать токен и новый пароль' })
  }

  try {
    const result = await tokenGenerator.validate(body.token as string, process.env.JWT_SECRET as string) as { email: string, type: string }

    if (result.type !== 'reset-password') {
      throw createError({ statusCode: 400, message: 'Неверный тип токена' })
    }

    const db = useDrizzle()
    const userQuery = await db.select().from(tables.users).where(eq(tables.users.email, result.email))
    const user = userQuery[0]

    if (!user) {
      throw createError({ statusCode: 404, message: 'Пользователь не найден' })
    }

    const hashedPassword = await hashPassword(body.password)

    await db
      .update(tables.users)
      .set({ password: hashedPassword })
      .where(eq(tables.users.email, result.email))

    return {
      success: true,
      message: 'Пароль успешно изменен',
    }
  }
  catch (error: unknown) {
    if (error instanceof H3Error) {
      throw error
    }
    else {
      throw createError({ statusCode: 400, message: 'Неверный или просроченный токен', data: error })
    }
  }
})
