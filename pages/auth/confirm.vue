<script setup lang="ts">
const title = 'Подтверждение email'

useHead({
  title,
})
const { confirmEmail, status, message } = useConfirmEmail()
const { clear } = useUserSession()

onMounted(async () => {
  await clear()
  await confirmEmail()
})

const alertColor = computed(() => {
  switch (status.value) {
    case 'loading':
      return 'info'
    case 'success':
      return 'success'
    case 'error':
      return 'error'
    default:
      return 'info'
  }
})
</script>

<template>
  <main>
    <UAlert
      :color="alertColor"
      variant="subtle"
    >
      <template #title>
        <template v-if="status === 'loading'">
          Проверка токена...
        </template>
        <template v-else-if="status === 'success'">
          Успешно
        </template>
        <template v-else-if="status === 'error'">
          Произошла ошибка
        </template>
      </template>
      <template #description>
        {{ message }}
        <UProgress
          v-if="status === 'loading'"
          animation="swing"
          color="secondary"
          class="mt-4"
        />
      </template>
    </UAlert>
    <div class="mt-4 flex justify-end gap-4">
      <UButton
        to="/auth/login"
        color="secondary"
      >
        Авторизоваться
      </UButton>
      <UButton
        to="/"
      >
        Главная
      </UButton>
    </div>
  </main>
</template>
