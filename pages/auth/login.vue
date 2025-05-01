<script setup lang="ts">
import LoginForm from '~/components/Forms/LoginForm.vue'

const title = 'Авторизация'

useHead({
  title,
})
</script>

<template>
  <main>
    <LoginForm
      @forgot-password="navigateTo('/auth/forgot_password')"
      @register="navigateTo('/auth/register')"
    />
  </main>
</template>
