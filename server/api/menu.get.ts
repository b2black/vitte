import type { NavigationMenuItem } from '@nuxt/ui'

export default defineEventHandler(async (): Promise<NavigationMenuItem[]> => {
  const allMenuItems = await useDrizzle().query.menuItems.findMany({
    orderBy: (items, { asc }) => [asc(items.order)],
    with: {
      children: {
        orderBy: (items, { asc }) => [asc(items.order)],
      },
    },
  })

  if (!Array.isArray(allMenuItems)) {
    throw createError({ statusCode: 500, message: 'Ошибка при получении меню' })
  }

  const transformMenuItem = (item: typeof allMenuItems[number]): NavigationMenuItem => ({
    label: item.label,
    icon: item.icon || undefined,
    to: item.to,
    ...(item.children?.length
      ? {
          children: item.children
            .filter(child => child.isActive)
            .map(child => transformMenuItem(child as typeof allMenuItems[number])),
        }
      : {}),
  })

  const menuItems = allMenuItems
    .filter(item => !item.parentId && item.isActive)
    .map(transformMenuItem)

  if (!Array.isArray(menuItems)) {
    throw createError({ statusCode: 500, message: 'Ошибка при формировании меню' })
  }

  return menuItems
})
