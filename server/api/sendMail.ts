export default defineEventHandler(async () => {
  const transporter = useMail()

  const res = await transporter.sendMail({
    from: '"Vitte" <hellomelkov@gmail.com>',
    to: 'hellomelkov@gmail.com',
    subject: 'Registration',
    text: 'Hello',
    html: '<b>hello</b>',
  })

  return {
    res,
  }
})
