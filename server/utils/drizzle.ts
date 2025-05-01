import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'

import { users, usersRelations } from '~/server/db/schemas/users.schema'
import { roles } from '~/server/db/schemas/roles.schema'
import { menuItems, menuItemsRelations } from '~/server/db/schemas/menu_items.schema'
import { services } from '~/server/db/schemas/services.schema'

export const tables = {
  users,
  roles,
  menuItems,
  services,
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
