<script setup lang="ts">
import LoginForm from '~/components/Forms/LoginForm.vue'

const title = 'Авторизация'

useHead({
  title,
})

definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <main>
    <LoginForm
      @forgot-password="navigateTo('/auth/forgot-password')"
      @register="navigateTo('/auth/register')"
    />
  </main>
</template>
