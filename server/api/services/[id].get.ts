import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const alias = event.context.params?.id as string

  if (!alias) {
    throw createError({ statusCode: 400, message: 'Обязательный параметр' })
  }

  const service = await useDrizzle().query.services.findFirst({
    where: eq(tables.services.alias, alias),
  })

  if (!service) {
    throw createError({ statusCode: 404, message: 'Программа обучения не найдена' })
  }

  return service
})
