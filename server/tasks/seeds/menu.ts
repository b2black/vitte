import { tables } from '~/server/utils/drizzle'

export default defineTask({
  meta: {
    name: 'seed:menu',
    description: 'Посев меню',
  },
  async run() {
    console.log('Начался посев меню...')

    const mainMenuItems: (typeof tables.menuItems.$inferInsert)[] = [
      {
        label: 'Блог',
        icon: 'i-lucide-rss',
        to: '/blog',
        order: 1,
      },
      {
        label: 'Об Университете',
        icon: 'i-lucide-book-open-check',
        to: '/about',
        order: 2,
      },
      {
        label: 'Сервисы',
        icon: 'i-lucide-school',
        to: '/services',
        order: 3,
      },
      {
        label: 'Контакты',
        icon: 'i-lucide-mail',
        to: '/contacts',
        order: 4,
      },
    ]

    const mainItems = await useDrizzle()
      .insert(tables.menuItems)
      .values(mainMenuItems)
      .returning({ id: tables.menuItems.id, label: tables.menuItems.label })

    const servicesParent = mainItems.find(item => item.label === 'Сервисы')
    const contactsParent = mainItems.find(item => item.label === 'Контакты')

    const subMenuItems: (typeof tables.menuItems.$inferInsert)[] = [
      {
        label: 'Веб-разработка',
        icon: 'i-lucide-code',
        to: '/services/web-dev',
        parentId: servicesParent?.id,
        order: 1,
      },
      {
        label: 'Графический дизайн',
        icon: 'i-lucide-paintbrush',
        to: '/services/design',
        parentId: servicesParent?.id,
        order: 2,
      },
      {
        label: 'Аналитика',
        icon: 'i-lucide-chart-bar',
        to: '/services/analytics',
        parentId: servicesParent?.id,
        order: 3,
      },
      {
        label: 'Обратная связь',
        icon: 'i-lucide-send',
        to: '/contacts/form',
        parentId: contactsParent?.id,
        order: 1,
      },
    ]

    await useDrizzle().insert(tables.menuItems).values(subMenuItems)

    return { result: 'Меню успешно добавлено' }
  },
})
