import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'

import { users, usersRelations } from '~/server/db/schemas/users.schema'
import { roles } from '~/server/db/schemas/roles.schema'
import { menuItems, menuItemsRelations } from '~/server/db/schemas/menu_items.schema'
import { services } from '~/server/db/schemas/services.schema'
import { feedback } from '~/server/db/schemas/feedback.schema'
import { posts, comments, commentsRelations, postsRelations } from '~/server/db/schemas/blog.schema'

export const tables = {
  users,
  roles,
  menuItems,
  services,
  feedback,
  posts,
  comments,
}

export const relations = {
  usersRelations,
  menuItemsRelations,
  commentsRelations,
  postsRelations,
}

export function useDrizzle() {
  return drizzle(process.env.DATABASE_URL ?? '', {
    schema: { ...tables, ...relations },
  })
}
