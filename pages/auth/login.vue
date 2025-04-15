<script setup lang="ts">
import LoginForm from '~/components/Forms/LoginForm.vue'

useHead({
  title: 'Авторизация',
})
</script>

<template>
  <main>
    <h1 class="text-2xl font-bold mb-8">
      Авторизация
    </h1>
    <LoginForm
      @forgot-password="navigateTo('/auth/reset_password')"
      @register="navigateTo('/auth/register')"
    />
  </main>
</template>
