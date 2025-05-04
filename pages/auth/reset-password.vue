<script setup lang="ts">
import ResetPasswordForm from '~/components/Forms/ResetPasswordForm.vue'

const route = useRoute()

if (!route.query.token) {
  navigateTo('/auth/login')
}

definePageMeta({
  middleware: 'auth',
})

const title = 'Сброс пароля'

useHead({
  title,
})
</script>

<template>
  <main>
    <ResetPasswordForm
      @success="navigateTo('/auth/login')"
    />
  </main>
</template>
