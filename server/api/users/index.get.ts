import { eq } from 'drizzle-orm'

export default eventHandler(async (event) => {
  const query = getQuery(event)
  const limit = Number(query.limit) || 10
  const page = Number(query.page) || 1

  const offset = (page - 1) * limit

  const data = await useDrizzle()
    .select({
      id: tables.Users.id,
      first_name: tables.Users.first_name,
      last_name: tables.Users.last_name,
      email: tables.Users.email,
      role_id: tables.Users.role_id,
      role_alias: tables.Roles.alias,
      role_name: tables.Roles.name,
    })
    .from(tables.Users)
    .limit(limit)
    .offset(offset)
    .leftJoin(tables.Roles, eq(tables.Users.role_id, tables.Roles.id))

  return {
    data,
    meta: {
      page,
      limit,
    },
  }
})
