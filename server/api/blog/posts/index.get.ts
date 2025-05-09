import { count, sql } from 'drizzle-orm'

export default eventHandler(async (event) => {
  const query = getQuery(event)
  const limit = Number(query.limit) || 10
  const page = Number(query.page) || 1

  const offset = (page - 1) * limit

  const db = useDrizzle()

  const total = await db.select({ count: count() }).from(tables.posts)
  const data = await db.query.posts.findMany({
    with: {
      user: {
        columns: {
          id: true,
          first_name: true,
          last_name: true,
        },
      },
    },
    extras: {
      comments_count: sql<number>`(select count(*) from comments where comments.post_id = ${tables.posts.id})`.as('comments_count'),
    },
    limit,
    offset,
  })

  return {
    data,
    meta: {
      page,
      limit,
      total: total[0].count,
    },
  }
})
