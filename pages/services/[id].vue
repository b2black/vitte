<script setup lang="ts">
const route = useRoute()

const alias = route.params.id as string
const { data: service } = await useFetch(`/api/services/${alias}`)

if (!service.value) {
  throw createError({ statusCode: 404, message: 'Программа обучения не найдена' })
}

const title = service.value?.label

useHead({
  title,
})
</script>

<template>
  <main>
    {{ service }}
  </main>
</template>
