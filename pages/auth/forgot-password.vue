<script setup lang="ts">
import ForgotPasswordForm from '~/components/Forms/ForgotPasswordForm.vue'

const title = 'Восстановление пароля'

definePageMeta({
  middleware: 'auth',
})

useHead({
  title,
})
</script>

<template>
  <main>
    <ForgotPasswordForm
      @back="navigateTo('/auth/login')"
    />
  </main>
</template>
