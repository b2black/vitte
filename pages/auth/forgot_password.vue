<script setup lang="ts">
import ForgotPasswordForm from '~/components/Forms/ForgotPasswordForm.vue'

useHead({
  title: 'Восстановление пароля',
})
</script>

<template>
  <main>
    <h1 class="text-2xl font-bold mb-8">
      Восстановление пароля
    </h1>
    <ForgotPasswordForm
      @back="navigateTo('/auth/login')"
    />
  </main>
</template>
