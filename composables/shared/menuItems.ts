import type { NavigationMenuItem } from '@nuxt/ui'

export const menuItems = ref<NavigationMenuItem[]>([
  {
    label: 'Блог',
    icon: 'i-lucide-rss',
    to: '/blog',
  },
  {
    label: 'Об Университете',
    icon: 'i-lucide-book-open-check',
    to: '/about',
  },
  {
    label: 'Сервисы',
    icon: 'i-lucide-school',
    to: '/services',
    children: [
      {
        label: 'Веб-разработка',
        icon: 'i-lucide-code',
        to: '/services/web-dev',
      }, {
        label: 'Графический дизайн',
        icon: 'i-lucide-paintbrush',
        to: '/services/design',
      }, {
        label: 'Аналитика',
        icon: 'i-lucide-chart-bar',
        to: '/services/analytics',
      },
    ],
  },
  {
    label: 'Контакты',
    icon: 'i-lucide-mail',
    to: '/contacts',
    children: [
      {
        label: 'Обратная связь',
        icon: 'i-lucide-send',
        to: '/contacts/form',
      },
    ],
  },
])
