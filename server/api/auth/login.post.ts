import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.email || !body.password) {
    throw createError({ statusCode: 400, message: 'Необходимо указать email и пароль' })
  }

  const db = useDrizzle()

  const userQuery = await db.select({
    id: tables.users.id,
    first_name: tables.users.first_name,
    last_name: tables.users.last_name,
    password: tables.users.password,
    email: tables.users.email,
    confirmed: tables.users.confirmed,
    created_at: tables.users.created_at,
    role: tables.roles,
  })
    .from(tables.users)
    .leftJoin(tables.roles, eq(tables.users.role_id, tables.roles.id))
    .where(eq(tables.users.email, body.email.toLowerCase()))

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
