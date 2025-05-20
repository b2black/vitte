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
        label: 'Программы обучения',
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
      {
        label: 'Записаться на обучение',
        icon: 'i-lucide-handshake',
        to: '/apply',
        order: 5,
      },
    ]

    const mainItems = await useDrizzle()
      .insert(tables.menuItems)
      .values(mainMenuItems)
      .returning({ id: tables.menuItems.id, label: tables.menuItems.label })

    const contactsParent = mainItems.find(item => item.label === 'Контакты')

    const subMenuItems: (typeof tables.menuItems.$inferInsert)[] = [
      {
        label: 'Обратная связь',
        icon: 'i-lucide-send',
        to: '/contacts/form',
        parent_id: contactsParent?.id,
        order: 1,
      },
    ]

    await useDrizzle().insert(tables.menuItems).values(subMenuItems)

    return { result: 'Меню успешно добавлено' }
  },
})
