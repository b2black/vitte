<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { isAdmin } = await useUserRole()
const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'Профиль',
      to: '/personal-account',
    },
    ...(isAdmin
      ? [{
          label: 'Программы обучения',
          to: '/personal-account/services',
        },
        {
          label: 'Пользователи',
          to: '/personal-account/users',
        }, {
          label: 'Обратная связь',
          to: '/personal-account/feedback',
        }, {
          label: 'Заявки на обучение',
          to: '/personal-account/applications',
        }]
      : []),
  ],
])
</script>

<template>
  <NuxtLayout name="default">
    <div class="flex gap-8">
      <div class="lk-menu w-full md:w-[20%]">
        <UNavigationMenu
          orientation="vertical"
          :items="items"
        />
      </div>
      <div class="content w-full md:w-[80%]">
        <slot />
      </div>
    </div>
  </NuxtLayout>
</template>
