import { eq } from 'drizzle-orm'

export default eventHandler(async (event) => {
  const query = getQuery(event)
  const limit = Number(query.limit) || 10
  const page = Number(query.page) || 1

  const offset = (page - 1) * limit

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
    },
  }
})
