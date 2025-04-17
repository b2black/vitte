import { eq } from 'drizzle-orm'
import { defineEventHandler, createError } from 'h3'
import { tokenGenerator } from '~/server/providers/TokenGenerator'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.email) {
    throw createError({ statusCode: 400, message: 'Необходимо указать email' })
  }

  const db = useDrizzle()
  const userQuery = await db
    .select()
    .from(tables.users)
    .where(eq(tables.users.email, body.email.toLowerCase()))

  if (!userQuery.length) {
    throw createError({ statusCode: 404, message: 'Пользователь не найден' })
  }

  const user = userQuery[0]

  if (user.confirmed) {
    throw createError({ statusCode: 400, message: 'Email уже подтвержден' })
  }

  const req = event.node.req
  const protocol = req.headers['x-forwarded-proto'] || 'http'
  const host = req.headers.host
  const url = `${protocol}://${host}/auth/confirm`
  const token = await tokenGenerator.generate(
    { email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: '1d' },
  )

  const mail = useMail()

  await mail.sendMail({
    to: user.email,
    subject: 'Подтверждение регистрации',
    text: `Подтвердите регистрацию, перейдя по ссылке: ${url}?token=${token}`,
    html: `<p>Подтвердите регистрацию, перейдя по ссылке: <a href="${url}?token=${token}">${url}?token=${token}</a></p>`,
  })

  return {
    success: true,
    message: 'Новое письмо с подтверждением отправлено на ваш email',
  }
})
