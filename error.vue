<script setup lang="ts">
import type { NuxtError } from '#app'

const title = 'Произошла ошибка'

useHead({
  title,
})

const props = defineProps({
  error: Object as () => NuxtError,
})
</script>

<template>
  <NuxtLayout name="clear">
    <main>
      <h1 class="text-2xl font-bold mb-8">
        {{ title }}
      </h1>
      <p class="text-xl text-red-500">
        {{ props.error?.statusCode || 500 }}
      </p>
      <p v-if="props.error?.statusCode === 404">
        Страница не найдена
      </p>
      <p
        v-else-if="props.error?.statusMessage"
        class="text"
      >
        {{ props.error?.statusMessage }}
      </p>
      <div class="mt-8 flex gap-4">
        <UButton @click="$router.push('/')">
          На главную
        </UButton>
        <UButton
          variant="soft"
          @click="$router.back()"
        >
          Назад
        </UButton>
      </div>
    </main>
  </NuxtLayout>
</template>
