<script setup lang="ts">
import FeedbackForm from '~/components/Forms/FeedbackForm.vue'

const title = 'Обратная связь'

useHead({
  title,
})
</script>

<template>
  <main>
    <FeedbackForm />
  </main>
</template>
