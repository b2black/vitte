import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.email || !body.password) {
    throw createError({ statusCode: 400, message: 'Необходимо указать email и пароль' })
  }

  const db = useDrizzle()

  const userQuery = await db.select({
    id: tables.Users.id,
    first_name: tables.Users.first_name,
    last_name: tables.Users.last_name,
    password: tables.Users.password,
    email: tables.Users.email,
    role: tables.Roles,
  })
    .from(tables.Users)
    .leftJoin(tables.Roles, eq(tables.Users.role_id, tables.Roles.id))
    .where(eq(tables.Users.email, body.email.toLowerCase()))

  const user = userQuery[0]
  if (!user) {
    throw createError({ statusCode: 404, message: 'Пользователь не найден' })
  }

  const isPasswordValid = await verifyPassword(user.password, body.password)
  if (!isPasswordValid) {
    throw createError({ statusCode: 401, message: 'Неверный email или пароль' })
  }

  const { password, ...userWithoutPassword } = user

  const token = await setUserSession(event, {
    user: userWithoutPassword,
  })

  return {
    success: true,
    message: 'Аутентификация выполнена успешно',
    user: userWithoutPassword,
    token,
  }
})
