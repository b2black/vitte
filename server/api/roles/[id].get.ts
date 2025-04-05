import { eq } from 'drizzle-orm';

export default eventHandler(async (event) => {
  const { id } = getRouterParams(event);

  if (!/^\d+$/.test(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID должен быть номером',
    });
  }

  const parsedId = parseInt(id);
  const result = await useDrizzle().select().from(tables.Roles).where(eq(tables.Roles.id, parsedId));

  if (!result[0]) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Роль Не найдена',
    });
  }

  return result[0];
});
