<script setup lang="ts">
const title = 'Личный кабинет'

useHead({
  title,
})
definePageMeta({
  middleware: 'authenticated',
  title,
})

const { user } = useUserSession()
const toast = useToast()
const loading = ref(false)
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
</script>

<template>
  <main>
    <UCard class="max-w-2xl">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium">
            Информация о пользователе
          </h3>
          <UButton
            to="/profile/edit"
            variant="soft"
            color="primary"
            icon="i-heroicons-pencil-square"
          >
            Редактировать
          </UButton>
        </div>
      </template>

      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
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

        <div>
          <div class="text-sm text-gray-500">
            Email
          </div>
          <div class="flex items-center gap-2">
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
        <client-only>
          <div class="text-sm text-gray-500">
            Дата регистрации: {{ new Date(user?.created_at).toLocaleDateString() }}
          </div>
        </client-only>
      </template>
    </UCard>
  </main>
</template>
