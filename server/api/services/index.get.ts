import { count } from 'drizzle-orm'

export default eventHandler(async (event) => {
  const query = getQuery(event)
  const limit = Number(query.limit) || 4
  const page = Number(query.page) || 1

  const offset = (page - 1) * limit

  const total = await useDrizzle().select({ count: count() }).from(tables.services)

  const data = await useDrizzle()
    .select()
    .from(tables.services)
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
