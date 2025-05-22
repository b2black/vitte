<script setup lang="ts">
definePageMeta({
  middleware: 'admin',
  layout: 'personal-account',
})

const title = 'Заявки на обучение'

useHead({
  title,
})

const route = useRoute()

const page = ref(route.query?.page ? parseInt(route.query?.page as string) : 1)

const { data: applications } = await useFetch('/api/services/applications/', {
  params: {
    page: page,
  },
})

const meta = applications.value?.meta

const items = computed(() => {
  return applications.value?.data?.map(item => ({
    'id': item.id,
    'User Id': item.user_id,
    'Message': item.message,
    'Confirmed': item.confirmed,
    'Email': item.email,
    'Name': item.name,
    'Service': item?.service?.label,
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
