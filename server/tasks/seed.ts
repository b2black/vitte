import { tables } from '~/server/utils/drizzle';

export default defineTask({
  meta: {
    name: 'db:seed',
    description: 'Посев',
  },
  async run() {
    console.log('Начался посев...');
    const roles: (typeof tables.Roles.$inferInsert)[] = [
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
    ];

    await useDrizzle().insert(tables.Roles).values(roles);
    return { result: 'Успешно' };
  },
});
