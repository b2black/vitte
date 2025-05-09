import { eq, count } from 'drizzle-orm'

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

  const total = await useDrizzle().select({ count: count() }).from(tables.users)

  const data = await useDrizzle()
    .select({
      id: tables.users.id,
      first_name: tables.users.first_name,
      last_name: tables.users.last_name,
      email: tables.users.email,
      role_id: tables.users.role_id,
      role_alias: tables.roles.alias,
      role_name: tables.roles.name,
    })
    .from(tables.users)
    .limit(limit)
    .offset(offset)
    .leftJoin(tables.roles, eq(tables.users.role_id, tables.roles.id))

  return {
    data,
    meta: {
      page,
      limit,
      total: total[0].count,
    },
  }
})
