<script setup lang="ts">
import ResetPasswordForm from '~/components/Forms/ResetPasswordForm.vue'

const route = useRoute()

if (!route.query.token) {
  navigateTo('/auth/login')
}

const title = 'Сброс пароля'

useHead({
  title,
})

definePageMeta({
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
