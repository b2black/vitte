import { count, eq } from 'drizzle-orm'

export default eventHandler(async (event) => {
  const query = getQuery(event)
  const limit = Number(query.limit) || 10
  const page = Number(query.page) || 1

  const offset = (page - 1) * limit

  const total = await useDrizzle().select({ count: count() }).from(tables.services)

  const data = await useDrizzle()
    .select()
    .from(tables.services)
    .where(eq(tables.services.active, true))
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
