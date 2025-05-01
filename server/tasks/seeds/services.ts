import { tables } from '~/server/utils/drizzle'

export default defineTask({
  meta: {
    name: 'seed:services',
    description: 'Посев программ обучения',
  },
  async run() {
    console.log('Начался программ обучения...')

    const services: (typeof tables.services.$inferInsert)[] = [
      {
        alias: 'web-dev',
        label: 'Веб-разработка',
        description: '',
        icon: 'i-lucide-code',
        active: true,
      },
      {
        alias: 'design',
        label: 'Графический дизайн',
        description: '',
        active: true,
        icon: 'i-lucide-paintbrush',
      },
      {
        alias: 'analytics',
        label: 'Аналитика',
        description: '',
        active: true,
        icon: 'i-lucide-chart-bar',
      },
    ]

    await useDrizzle().insert(tables.services).values(services)
    return { result: 'Программы обучения успешно добавлены' }
  },
})
