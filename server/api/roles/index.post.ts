import { createInsertSchema } from 'drizzle-valibot'
import { parse } from 'valibot'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (Object.keys(body).length === 0) {
    throw createError({ statusCode: 400, message: 'Не указаны данные для создания роли' })
  }

  const roleInsertSchema = createInsertSchema(tables.Roles)

  let parsed
  try {
    parsed = parse(roleInsertSchema, body)
  }
  catch (error: unknown) {
    throw createError({ statusCode: 400, message: 'Ошибка валидации данных', data: error })
  }

  const result = await useDrizzle().insert(tables.Roles).values(parsed)

  return {
    message: 'Роль успешно создана',
    created: result.rowCount,
  }
})
