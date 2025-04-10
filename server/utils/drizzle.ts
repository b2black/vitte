import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'

import { users, usersRelations } from '~/server/db/schemas/user.schema'
import { roles } from '~/server/db/schemas/roles.schema'
import { menuItems, menuItemsRelations } from '~/server/db/schemas/menu_items.schema'

export const tables = {
  users,
  roles,
  menuItems,
}

export const relations = {
  usersRelations,
  menuItemsRelations,
}

export function useDrizzle() {
  return drizzle(process.env.DATABASE_URL ?? '', {
    schema: { ...tables, ...relations },
  })
}
