import nodemailer from 'nodemailer'
import 'dotenv/config'

export function useMail() {
  const config = {
    host: process.env.MAIL_SMTP_HOST ?? 'localhost',
    port: process.env.MAIL_PORT ?? 465,
    secure: process.env.MAIL_SECURE ?? false,
    auth: {
      user: process.env.MAIL_USER ?? '',
      pass: process.env.MAIL_PASS ?? '',
    },
  }

  // @ts-expect-error transport config
  return nodemailer.createTransport(config)
}
