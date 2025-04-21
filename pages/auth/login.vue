<script setup lang="ts">
import LoginForm from '~/components/Forms/LoginForm.vue'
import { definePageMeta } from '#imports'

const title = 'Авторизация'

useHead({
  title,
})

definePageMeta({
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
