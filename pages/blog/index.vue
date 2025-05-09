<script setup lang="ts">
const title = 'Блог'

useHead({
  title,
})

const route = useRoute()

const page = ref(route.query?.page ? parseInt(route.query?.page as string) : 1)

const { data: posts } = await useFetch('/api/blog/posts', {
  params: {
    page: page,
  },
})

const meta = posts.value?.meta
const limit = ref(meta?.limit ?? 10)
const total = ref(meta?.total ?? 0)
</script>

<template>
  <main>
    <div class="mb-8">
      <div
        v-for="post in posts?.data"
        :key="post.id"
        class="rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full cursor-pointer"
        @click="navigateTo(`/blog/${post.slug}`)"
      >
        <div class="md:flex">
          <div
            v-if="post.image"
            class="md:flex-shrink-0 md:w-48 lg:w-64"
          >
            <NuxtImg
              :src="post.image"
              class="h-48 w-full object-cover md:h-full md:w-48 lg:w-64"
              format="webp"
            />
          </div>
          <div class="p-6 md:p-8 flex flex-col justify-between flex-1">
            <div>
              <ULink class="block mt-1 text-lg font-medium">
                {{ post.title }}
              </ULink>
              <p class="mt-2 text-gray-500">
                {{ post.description ?? 'Не заполнено описание поста' }}
              </p>
            </div>

            <div class="mt-4 flex items-center flex-wrap gap-4 justify-between">
              <div class="flex items-center gap-4">
                <div
                  v-if="post.created_at"
                  class="flex items-center gap-1 text-sm text-gray-500"
                >
                  <UIcon name="i-lucide-calendar-1" />
                  {{ new Date(post.created_at).toLocaleDateString() }}
                </div>
                <div class="flex items-center text-sm text-gray-500 gap-1">
                  <UIcon name="i-lucide-message-circle-more" />
                  {{ post.comments_count }}
                </div>
              </div>

              <div
                v-if="post.user"
                class="flex items-center gap-2"
              >
                <div class="flex-shrink-0">
                  <div
                    class="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center"
                  >
                    <UIcon
                      name="i-lucide-user"
                      class="text-gray-500"
                    />
                  </div>
                </div>
                <div class="text-sm text-gray-600">
                  {{ post.user.first_name }} {{ post.user.last_name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
