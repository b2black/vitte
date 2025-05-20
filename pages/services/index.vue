<script setup lang="ts">
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
    label: item?.label,
    content: item?.description ? item?.description?.substring(0, 400) + '...' : '',
    icon: item?.icon,
    to: '/services/' + item.alias,
  }))
})

const limit = ref(meta?.limit ?? 50)
const total = ref(meta?.total ?? 0)
</script>

<template>
  <main>
    <div
      v-if="items"
      class="grid md:grid-cols-2 grid-cols-1 gap-4 mb-8"
    >
      <UCard
        v-for="service in items"
        :key="service.id"
        variant="soft"
      >
        <template #header>
          {{ service.label }}
        </template>

        <template
          v-if="service.content"
          #default
        >
          {{ service.content }}
        </template>

        <template #footer>
          <ULink :to="service.to">Перейти</ULink>
        </template>
      </UCard>
    </div>
    <div v-else>
      Ничего не найдено
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
