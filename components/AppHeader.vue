<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import LoginForm from '~/components/Forms/LoginForm.vue'

const { loggedIn, clear, user } = useUserSession()
const isLoginFormOpen = ref(false)
const isSlideOverOpen = ref(false)

const profileItems: DropdownMenuItem[] = [
  [
    {
      label: 'Профиль',
      icon: 'i-lucide-user',
      onSelect: () => navigateTo('/personal-account'),
      type: 'link',
    },
  ],
  [
    {
      label: 'Выйти',
      icon: 'i-lucide-log-out',
      onSelect: async () => {
        await clear()
        window.location.reload()
      },
      type: 'link',
    },
  ],
]

const { menuItems } = await useMenu()

watch(loggedIn, (value) => {
  if (value) {
    isLoginFormOpen.value = false
  }
})
</script>

<template>
  <header class="border-b border-gray-200 bg-white">
    <UContainer class="mx-auto px-4 py-3">
      <div class="flex items-center justify-between">
        <NuxtLink
          to="/"
          class="flex items-center gap-2"
        >
          <span class="font-bold text-lg">МУИВ</span>
        </NuxtLink>

        <div class="hidden md:flex md:items-center md:w-full md:justify-between md:ml-8">
          <UNavigationMenu
            :items="menuItems"
            class="w-full"
          />

          <div class="flex items-center gap-3">
            <UModal
              v-if="!loggedIn"
              v-model:open="isLoginFormOpen"
              title="Войти"
            >
              <UButton
                icon="i-lucide-user"
                label="Войти"
                color="primary"
              />
              <template #body>
                <LoginForm
                  @forgot-password="navigateTo('/auth/forgot-password'); isLoginFormOpen = false"
                  @register="navigateTo('/auth/register'); isLoginFormOpen = false"
                />
              </template>
            </UModal>

            <UDropdownMenu
              v-else
              :items="profileItems"
              :content="{ align: 'end', side: 'bottom' }"
            >
              <UButton
                icon="i-lucide-rocket"
                color="neutral"
                variant="outline"
                class="cursor-pointer"
                :label="`${(user as any)?.first_name} ${(user as any)?.last_name}`"
              />
            </UDropdownMenu>
          </div>
        </div>
        <USlideover
          v-model:open="isSlideOverOpen"
          side="right"
          :width="300"
          title="Меню"
        >
          <UButton
            class="md:hidden"
            color="neutral"
            variant="ghost"
            icon="i-heroicons-bars-3"
          />

          <template #body>
            <div class="flex flex-col gap-8 justify-between h-full">
              <UNavigationMenu
                orientation="vertical"
                :items="menuItems"
                class="w-full"
              />
              <div class="flex flex-row justify-end">
                <UButton
                  v-if="!loggedIn"
                  icon="i-lucide-user"
                  label="Войти"
                  color="primary"
                  @click="navigateTo('/auth/login'); isSlideOverOpen = false"
                />
                <UButton
                  v-else
                  icon="i-lucide-user"
                  label="Личный кабинет"
                  color="primary"
                  @click="navigateTo('/personal-account'); isSlideOverOpen = false"
                />
              </div>
            </div>
          </template>
        </USlideover>
      </div>
    </UContainer>
  </header>
</template>
