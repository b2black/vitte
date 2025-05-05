<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const breadcrumbItems = useBreadcrumbItems()
const currentItem = computed(() => breadcrumbItems.value.find(item => item.current))

const { isAdmin } = await useUserRole()
const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'Профиль',
      to: '/profile',
    },
    ...(isAdmin
      ? [{
          label: 'Сервисы',
          to: '/profile/services',
        },
        {
          label: 'Пользователи',
          to: '/profile/users',
        }]
      : []),
  ],
])
</script>

<template>
  <div class="main-layout">
    <AppHeader />
    <UContainer
      class="pt-8 pb-4"
    >
      <BreadCrumbs />
    </UContainer>
    <UContainer class="min-h-screen py-8">
      <h1
        v-if="currentItem && currentItem.label"
        class="text-2xl font-bold mb-8"
      >
        {{ currentItem.label }}
      </h1>
      <div class="grid grid-flow-col gap-16">
        <div class="lk-menu">
          <UNavigationMenu
            orientation="vertical"
            :items="items"
            class="data-[orientation=vertical]:w-64"
          />
        </div>
        <div class="content">
          <slot />
        </div>
      </div>
    </UContainer>
    <AppFooter />
  </div>
</template>
