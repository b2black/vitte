<script setup lang="ts">
import ProfileEditForm from '~/components/Forms/ProfileEditForm.vue'

const title = 'Редактировать профиль'

useHead({
  title,
})
definePageMeta({
  middleware: 'authenticated',
  title,
})
</script>

<template>
  <main>
    <ProfileEditForm />
  </main>
</template>
