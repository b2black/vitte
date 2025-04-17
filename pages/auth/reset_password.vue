<script setup lang="ts">
import ResetPasswordForm from '~/components/Forms/ResetPasswordForm.vue'

const route = useRoute()

if (!route.query.token) {
  navigateTo('/auth/login')
}

useHead({
  title: 'Сброс пароля',
})
</script>

<template>
  <main>
    <h1 class="text-2xl font-bold mb-8">
      Сброс пароля
    </h1>
    <ResetPasswordForm
      @success="navigateTo('/auth/login')"
    />
  </main>
</template>
