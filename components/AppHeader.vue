<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import LoginForm from '~/components/Forms/LoginForm.vue'
import RegisterForm from '~/components/Forms/RegisterForm.vue'

const { loggedIn, clear, user } = useUserSession()
const isRegisterFormOpen = ref(false)
const isLoginFormOpen = ref(false)

const profileItems: DropdownMenuItem[] = [
  [
    {
      label: 'Профиль',
      icon: 'i-lucide-user',
      onSelect: () => navigateTo('/profile'),
      type: 'link',
    },
  ],
  [
    {
      label: 'Выйти',
      icon: 'i-lucide-log-out',
      onSelect: clear,
      type: 'link',
    },
  ],
]

const openRegisterForm = () => {
  isRegisterFormOpen.value = true
  isLoginFormOpen.value = false
}

const openLoginForm = () => {
  isRegisterFormOpen.value = false
  isLoginFormOpen.value = true
}

watch(loggedIn, (value) => {
  if (value) {
    isRegisterFormOpen.value = false
    isLoginFormOpen.value = false
  }
})
</script>

<template>
  <header class="border-b border-gray-200 bg-white">
    <UContainer class="mx-auto px-4 py-3 flex items-center justify-between">
      <NuxtLink
        to="/"
        class="flex items-center gap-2"
      >
        <UIcon
          name="i-heroicons-academic-cap"
          class="w-6 h-6 text-primary"
        />
        <span class="font-bold text-lg">МУИВ</span>
      </NuxtLink>

      <nav class="hidden md:flex items-center gap-6">
        <!-- Add navigation links here -->
      </nav>

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
            <LoginForm @register="openRegisterForm" />
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
    </UContainer>

    <UModal
      v-model:open="isRegisterFormOpen"
      title="Зарегистрироваться"
    >
      <template #body>
        <RegisterForm @login="openLoginForm" />
      </template>
    </UModal>
  </header>
</template>
