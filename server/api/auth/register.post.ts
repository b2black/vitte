import { eq } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-valibot'
import { parse } from 'valibot'
import { tokenGenerator } from '~/server/providers/TokenGenerator'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.email || !body.password || !body.first_name || !body.last_name) {
    throw createError({ statusCode: 400, message: 'Не заполнены обязательные поля' })
  }

  const db = useDrizzle()

  const existingUser = await db
    .select()
    .from(tables.users)
    .where(eq(tables.users.email, body.email.toLowerCase()))

  if (existingUser.length) {
    throw createError({ statusCode: 409, message: 'Email уже используется' })
  }

  const defaultRoleQuery = await db
    .select()
    .from(tables.roles)
    .where(eq(tables.roles.alias, 'default'))

  if (!defaultRoleQuery.length) {
    throw createError({ statusCode: 404, message: 'Стандартная роль не найдена' })
  }

  body.role_id = defaultRoleQuery[0].id

  body.password = await hashPassword(body.password)

  const userSchema = createInsertSchema(tables.users)
  let validatedBody
  try {
    validatedBody = parse(userSchema, body)
  }
  catch (error: unknown) {
    throw createError({ statusCode: 400, message: 'Ошибка валидации', data: error })
  }

  try {
    const result = await db.insert(tables.users).values(validatedBody).returning()

    const req = event.node.req
    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const host = req.headers.host
    const url = `${protocol}://${host}/auth/confirm`
    const token = await tokenGenerator.generate({ email: result[0].email },
      process.env.JWT_SECRET as string, { expiresIn: '1d' })

    const mail = useMail()

    mail.sendMail(
      {
        to: body.email,
        subject: 'Подтверждение регистрации',
        text: `Подтвердите регистрацию, перейдя по ссылке: ${url}?token=${token}`,
        html: `<p>Подтвердите регистрацию, перейдя по ссылке: <a href="${url}?token=${token}">${url}?token=${token}</a></p>`,
      },
    )

    return {
      success: true,
      message: `Спасибо за регистрацию на нашем сайте! \
          Пожалуйста, подтвердите ваш email, ссылка отправлена вам на электронную почту`,
      user: {
        id: result[0].id,
        first_name: result[0].first_name,
        last_name: result[0].last_name,
        email: result[0].email,
        role_id: result[0].role_id,
      },
    }
  }
  catch (error: unknown) {
    throw createError({ statusCode: 400, message: 'Ошибка добавления данных в базу', data: error })
  }
})
