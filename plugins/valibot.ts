import * as v from 'valibot'
import '@valibot/i18n/ru'

export default defineNuxtPlugin(() => {
  v.setGlobalConfig({ lang: 'ru' })
})
