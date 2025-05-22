import { createInsertSchema } from 'drizzle-valibot'
import { parse } from 'valibot'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const db = useDrizzle()

  const applicationSchema = createInsertSchema(tables.applications)
  let validatedBody
  try {
    validatedBody = parse(applicationSchema, body)
  }
  catch (error: unknown) {
    throw createError({ statusCode: 400, message: 'Ошибка валидации полей', data: error })
  }

  try {
    await db.insert(tables.applications).values(validatedBody).returning()

    return {
      success: true,
      message: `Ваша заявка принята`,
    }
  }
  // eslint-disable-next-line
  catch (error: any) {
    if (typeof error?.code === 'string' && error?.code === '23505') {
      throw createError({ statusCode: 400, message: 'Вы уже отправляли заявку по данному направлению', data: error })
    }
    throw createError({ statusCode: 400, message: 'Ошибка добавления данных в базу', data: error })
  }
})
