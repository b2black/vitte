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

function handleUpdate() {}
</script>

<template>
  <main>
    <ProfileEditForm @update="handleUpdate" />
  </main>
</template>
