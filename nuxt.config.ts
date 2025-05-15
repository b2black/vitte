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
    '@nuxtjs/seo',
  ],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  routeRules: {
    '/**': { prerender: true },
    '/api/**': { static: false, cache: false },
  },
  site: {
    name: 'МУИВ',
  },
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
    locales: [
      { code: 'ru', name: 'Русский', file: 'ru.json', lazy: true },
    ],
  },
})
