import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.email || !body.password) {
    throw createError({ statusCode: 400, message: 'Необходимо указать email и пароль' })
  }

  const db = useDrizzle()

  const userQuery = await db
    .select()
    .from(tables.Users)
    .where(eq(tables.Users.email, body.email.toLowerCase()))

  const user = userQuery[0]
  if (!user) {
    throw createError({ statusCode: 404, message: 'Пользователь не найден' })
  }

  const isPasswordValid = await verifyPassword(body.password, user.password)
  if (!isPasswordValid) {
    throw createError({ statusCode: 401, message: 'Неверный email или пароль' })
  }

  const token = setUserSession(event, {
    userId: user.id,
    role: user.role_id,
  })

  return {
    success: true,
    message: 'Аутентификация выполнена успешно',
    token,
    user: {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role_id: user.role_id,
    },
  }
})
