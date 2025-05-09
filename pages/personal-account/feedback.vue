<script setup lang="ts">
definePageMeta({
  middleware: 'admin',
  layout: 'personal-account',
})

const title = 'Обращения формы обратной связи'

useHead({
  title,
})

const route = useRoute()

const page = ref(route.query?.page ? parseInt(route.query?.page as string) : 1)

const { data: feedback } = await useFetch('/api/feedback/', {
  params: {
    page: page,
  },
})

const meta = feedback.value?.meta

const items = computed(() => {
  return feedback.value?.data?.map(item => ({
    id: item.id,
    Email: item.email,
    Name: item.name,
    Message: item.message,
  }))
})

const limit = ref(meta?.limit ?? 10)
const total = ref(meta?.total ?? 0)
</script>

<template>
  <main>
    <div class="mb-8">
      <UTable
        :data="items"
        class="flex-1 w-full"
      />
    </div>
    <div class="flex md:justify-end justify-center">
      <UPagination
        v-if="total > 0"
        v-model:page="page"
        variant="soft"
        :items-per-page="limit"
        :total="total"
        :to="toPage => ({ query: { page: toPage } })"
      />
    </div>
  </main>
</template>

<style scoped>

</style>
