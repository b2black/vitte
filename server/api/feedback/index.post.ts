import { createInsertSchema } from 'drizzle-valibot'
import { parse } from 'valibot'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const db = useDrizzle()

  const feedbackSchema = createInsertSchema(tables.feedback)
  let validatedBody
  try {
    validatedBody = parse(feedbackSchema, body)
  }
  catch (error: unknown) {
    throw createError({ statusCode: 400, message: 'Ошибка валидации полей', data: error })
  }

  try {
    const result = await db.insert(tables.feedback).values(validatedBody).returning()

    return {
      success: true,
      message: `Ваше обращение зарегистрировано`,
    }
  }
  catch (error: unknown) {
    throw createError({ statusCode: 400, message: 'Ошибка добавления данных в базу', data: error })
  }
})
