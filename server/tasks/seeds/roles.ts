import { tables } from '~/server/utils/drizzle'

export default defineTask({
  meta: {
    name: 'seed:roles',
    description: 'Посев ролей',
  },
  async run() {
    console.log('Начался посев...')
    const roles: (typeof tables.roles.$inferInsert)[] = [
      {
        name: 'Стандартный',
        alias: 'default',
      },
      {
        name: 'Администратор',
        alias: 'admin',
      },
      {
        name: 'Студент',
        alias: 'student',
      },
      {
        name: 'Преподаватель',
        alias: 'teacher',
      },
    ]

    await useDrizzle().insert(tables.roles).values(roles)
    return { result: 'Успешно' }
  },
})
