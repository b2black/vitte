import { createInsertSchema } from 'drizzle-valibot'
import { parse } from 'valibot'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const db = useDrizzle()

  const commentsSchema = createInsertSchema(tables.comments)
  let validatedBody
  try {
    validatedBody = parse(commentsSchema, body)
  }
  catch (error: unknown) {
    throw createError({ statusCode: 400, message: 'Ошибка валидации полей', data: error })
  }

  try {
    await db.insert(tables.comments).values(validatedBody).returning()

    return {
      success: true,
      message: `Ваш комментарий отправлен`,
    }
  }
  catch (error: unknown) {
    throw createError({ statusCode: 400, message: 'Ошибка добавления данных в базу', data: error })
  }
})
