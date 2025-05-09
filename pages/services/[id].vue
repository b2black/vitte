<script setup lang="ts">
const route = useRoute()

const alias = route.params.id as string
const { data: service } = await useFetch(`/api/services/${alias}`)

if (!service.value) {
  throw createError({ statusCode: 404, message: 'Программа обучения не найдена' })
}

definePageMeta({
  layout: 'clear',
})

const title = service.value?.label

useHead({
  title,
})

useBreadcrumbItems({
  overrides: [
    undefined,
    undefined,
    {
      label: title,
    },
  ],
})
</script>

<template>
  <main>
    <div class="pb-4">
      <BreadCrumbs />
    </div>
    <div class="py-8">
      <h1
        class="text-2xl font-bold mb-8"
      >
        {{ title }}
      </h1>

      <div
        v-if="service?.image"
        class="image-container flex h-96 mb-8"
      >
        <NuxtImg
          :src="service?.image"
          class="w-full object-cover rounded-2xl"
          format="webp"
        />
      </div>

      <div
        v-if="service?.description"
        class="mb-8"
      >
        {{ service?.description }}
      </div>

      <div class="flex justify-end">
        <UButton
          variant="soft"
          @click="$router.back()"
        >
          Назад
        </UButton>
      </div>
    </div>
  </main>
</template>
