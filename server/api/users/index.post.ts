import { eq } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-valibot'
import { parse } from 'valibot'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.email || !body.password || !body.first_name || !body.last_name || !body.role_id) {
    throw createError({ statusCode: 400, message: 'Не заполнены обязательные поля' })
  }

  const db = useDrizzle()

  const existingUser = await db
    .select()
    .from(tables.users)
    .where(eq(tables.users.email, body.email.toLowerCase()))

  if (existingUser.length) {
    throw createError({ statusCode: 409, message: 'Email уже используется' })
  }

  body.password = await hashPassword(body.password)

  const userSchema = createInsertSchema(tables.users)
  let validatedBody
  try {
    validatedBody = parse(userSchema, body)
  }
  catch (error: unknown) {
    throw createError({ statusCode: 400, message: 'Ошибка валидации', data: error })
  }

  try {
    const result = await db.insert(tables.users).values(validatedBody).returning()
    return {
      success: true,
      message: 'Пользователь успешно зарегистрирован',
      user: {
        id: result[0].id,
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        role_id: body.role_id,
      },
    }
  }
  catch (error: unknown) {
    throw createError({ statusCode: 400, message: 'Ошибка добавления данных в базу', data: error })
  }
})
