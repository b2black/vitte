import { eq, sql } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const slug = event.context.params?.id as string

  if (!slug) {
    throw createError({ statusCode: 400, message: 'Обязательный параметр' })
  }

  const post = await useDrizzle().query.posts.findFirst({
    where: eq(tables.posts.slug, slug),
    with: {
      user: {
        columns: {
          id: true,
          first_name: true,
          last_name: true,
        },
      },
      comments: {
        with: {
          user: {
            columns: {
              id: true,
              first_name: true,
              last_name: true,
            },
          },
        },
      },
    },
    extras: {
      comments_count: sql<number>`(select count(*) from comments where comments.post_id = ${tables.posts.id})`.as('comments_count'),
    },
  })

  if (!post) {
    throw createError({ statusCode: 404, message: 'Пост не найден' })
  }

  return post
})
