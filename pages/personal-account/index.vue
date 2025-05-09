<script setup lang="ts">
import ProfileEditForm from '~/components/Forms/ProfileEditForm.vue'

const title = 'Личный кабинет'

useHead({
  title,
})
definePageMeta({
  middleware: 'non-authenticated',
  layout: 'personal-account',
})

const { user, clear } = useUserSession()
const toast = useToast()
const loading = ref(false)
const view = ref('view')

async function sendConfirmationEmail() {
  try {
    loading.value = true
    const { data, error } = await useFetch('/api/auth/resend-confirmation', {
      method: 'POST',
      body: { email: user?.value?.email },
    })

    if (error.value) {
      toast.add({
        title: 'Ошибка',
        description: error.value?.data?.message || 'Ошибка при отправке письма подтверждения',
        color: 'error',
      })
    }
    else {
      toast.add({
        title: 'Успешно',
        description: data.value?.message || 'Письмо подтверждения успешно отправлено',
        color: 'success',
      })
    }
  }
  catch {
    toast.add({
      title: 'Ошибка',
      description: 'Произошла неизвестная ошибка',
      color: 'error',
    })
  }
  finally {
    loading.value = false
  }
}

async function logout() {
  await clear()
  navigateTo('/')
}
</script>

<template>
  <main>
    <UCard
      v-if="view === 'view'"
      class="mb-8 w-full"
    >
      <template #header>
        <div class="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-0">
          <h3 class="text-lg font-medium">
            Информация о пользователе
          </h3>
          <UButton
            variant="soft"
            color="primary"
            icon="i-heroicons-pencil-square"
            @click="view = 'edit'"
          >
            Редактировать
          </UButton>
        </div>
      </template>

      <div class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div class="text-sm text-gray-500">
              Имя
            </div>
            <div>
              {{ user?.first_name }}
            </div>
          </div>
          <div>
            <div class="text-sm text-gray-500">
              Фамилия
            </div>
            <div>
              {{ user?.last_name }}
            </div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div class="text-sm text-gray-500">
            Email
          </div>
          <div class="flex flex-wrap items-center gap-4">
            {{ user?.email }}
            <UBadge
              v-if="user?.confirmed"
              color="success"
              variant="subtle"
              size="md"
            >
              Подтвержден
            </UBadge>
            <UBadge
              v-else
              color="warning"
              variant="subtle"
              size="md"
            >
              Не подтвержден
            </UBadge>
            <UButton
              v-if="!user?.confirmed"
              size="xs"
              variant="outline"
              color="primary"
              :loading="loading"
              @click="sendConfirmationEmail"
            >
              Отправить письмо
            </UButton>
          </div>
        </div>

        <div>
          <div class="text-sm text-gray-500">
            Роль
          </div>
          <div>
            {{ user?.role?.name }}
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex flex-wrap justify-between gap-8">
          <client-only>
            <div class="text-sm text-gray-500">
              Дата регистрации: {{ new Date(user?.created_at).toLocaleDateString() }}
            </div>
          </client-only>
          <UButton
            variant="outline"
            @click="logout"
          >
            Выйти
          </UButton>
        </div>
      </template>
    </UCard>
    <div v-else-if="view === 'edit'">
      <div class="flex justify-end mb-8">
        <UButton
          variant="soft"
          @click="view = 'view'"
        >
          Назад
        </UButton>
      </div>
      <ProfileEditForm />
    </div>
  </main>
</template>
