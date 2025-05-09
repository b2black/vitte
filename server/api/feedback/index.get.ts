import { count } from 'drizzle-orm'

export default eventHandler(async (event) => {
  const query = getQuery(event)
  const limit = Number(query.limit) || 10
  const page = Number(query.page) || 1

  const offset = (page - 1) * limit

  const { user } = await requireUserSession(event)
  const hasRights = user.role.alias === 'admin' || user.role.alias === 'teacher'

  if (!hasRights) {
    throw createError({ statusCode: 400, message: 'Отсутствуют права на просмотр' })
  }

  const total = await useDrizzle().select({ count: count() }).from(tables.feedback)

  const data = await useDrizzle()
    .select()
    .from(tables.feedback)
    .limit(limit)
    .offset(offset)

  return {
    data,
    meta: {
      page,
      limit,
      total: total[0].count,
    },
  }
})
