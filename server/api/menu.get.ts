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

  const services = await useDrizzle().query.services.findMany()
  const servicesMainItemIndex = allMenuItems.findIndex(item => item.label === 'Программы обучения')

  const servicesMenuItems = services.map(service => ({
    id: 9000 + service.id,
    label: service.label,
    icon: service.icon,
    to: `/services/${service.alias}`,
    order: service.order,
    parent_id: allMenuItems[servicesMainItemIndex]?.id ?? null,
    created_at: service.created_at,
    updated_at: service.updated_at,
    active: service.active,
    children: [],
  }))

  allMenuItems.push(...servicesMenuItems)
  allMenuItems[servicesMainItemIndex]?.children.push(...servicesMenuItems)

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
            .filter(child => child.active)
            .map(child => transformMenuItem(child as typeof allMenuItems[number])),
        }
      : {}),
  })

  const menuItems = allMenuItems
    .filter(item => !item.parent_id && item.active)
    .map(transformMenuItem)

  if (!Array.isArray(menuItems)) {
    throw createError({ statusCode: 500, message: 'Ошибка при формировании меню' })
  }

  return menuItems
})
