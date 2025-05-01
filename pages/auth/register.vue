<script setup lang="ts">
import RegisterForm from '~/components/Forms/RegisterForm.vue'

const title = 'Регистрация'
useHead({
  title,
})

const registerFormRef = ref<typeof RegisterForm>()
</script>

<template>
  <main>
    <RegisterForm
      ref="registerFormRef"
      @login="navigateTo('/auth/login')"
    />
    <UAlert
      v-if="registerFormRef?.status === 'error' || registerFormRef?.status === 'success'"
      class="mt-8"
      variant="subtle"
      :color="registerFormRef?.status"
    >
      <template #title>
        <template v-if="registerFormRef?.status === 'success'">
          Успешно
        </template>
        <template v-else-if="registerFormRef?.status === 'error'">
          Произошла ошибка
        </template>
      </template>
      <template #description>
        {{ registerFormRef?.message }}
      </template>
    </UAlert>
  </main>
</template>
