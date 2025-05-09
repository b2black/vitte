<script setup lang="ts">
definePageMeta({
  middleware: 'admin',
  layout: 'personal-account',
})

const title = 'Программы обучения'

useHead({
  title,
})

const route = useRoute()

const page = ref(route.query?.page ? parseInt(route.query?.page as string) : 1)

const { data: services } = await useFetch('/api/services/', {
  params: {
    page: page,
  },
})

const meta = services.value?.meta

const items = computed(() => {
  return services.value?.data?.map(item => ({
    id: item.id,
    Label: item?.label,
    Description: item?.description ? item?.description?.substring(0, 100) + '...' : '',
    Icon: item?.icon,
    To: '/services/' + item.alias,
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
