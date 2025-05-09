<script setup lang="ts">
definePageMeta({
  middleware: 'admin',
  layout: 'personal-account',
})

const title = 'Пользователи'

useHead({
  title,
})

const route = useRoute()

const page = ref(route.query?.page ? parseInt(route.query?.page as string) : 1)

const { data: users } = await useFetch('/api/users/', {
  params: {
    page: page,
  },
})

const meta = users.value?.meta

const items = computed(() => {
  return users.value?.data?.map(item => ({
    'id': item.id,
    'First Name': item.first_name,
    'Last Name': item.last_name,
    'Email': item.email,
    'Role': item.role_name,
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
