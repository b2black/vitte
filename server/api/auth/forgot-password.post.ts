import { eq } from 'drizzle-orm'
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

  const user = userQuery[0]
  if (!user) {
    throw createError({ statusCode: 404, message: 'Пользователь не найден' })
  }

  const req = event.node.req
  const protocol = req.headers['x-forwarded-proto'] || 'http'
  const host = req.headers.host

  const token = await tokenGenerator.generate(
    { email: user.email, type: 'reset-password' },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' },
  )

  const resetLink = `${protocol}://${host}/auth/reset_password?token=${token}`

  const mail = useMail()

  await mail.sendMail({
    to: user.email,
    subject: 'Сброс пароля',
    text: `Сбросьте пароль, перейдя по ссылке: ${resetLink}`,
    html: `<p>Сбросьте пароль, перейдя по ссылке: <a href="${resetLink}">${resetLink}</a></p>`,
  })

  return {
    success: true,
    message: 'Инструкции по сбросу пароля отправлены на ваш email',
  }
})
