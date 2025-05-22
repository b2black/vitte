import { count, eq } from 'drizzle-orm'

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

  const total = await useDrizzle().select({ count: count() }).from(tables.applications)

  const data = await useDrizzle()
    .select({
      id: tables.applications.id,
      name: tables.applications.name,
      email: tables.applications.email,
      message: tables.applications.message,
      service: tables.services,
      confirmed: tables.applications.confirmed,
      created_at: tables.applications.created_at,
      user_id: tables.applications.id,
    })
    .from(tables.applications)
    .limit(limit)
    .offset(offset)
    .leftJoin(tables.services, eq(tables.applications.service_id, tables.services.id))

  return {
    data,
    meta: {
      page,
      limit,
      total: total[0].count,
    },
  }
})
