// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    'nuxt-auth-utils',
    '@nuxtjs/i18n',
  ],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  ui: {
    colorMode: false,
  },
  compatibilityDate: '2024-11-01',
  nitro: {
    experimental: {
      tasks: true,
    },
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  i18n: {
    defaultLocale: 'ru',
  },
})
