<script setup lang="ts">
const route = useRoute()

const id = route.params.id as string
const { data: post } = await useFetch(`/api/blog/posts/${id}`)

if (!post.value) {
  throw createError({ statusCode: 404, message: 'Пост не найден' })
}

definePageMeta({
  layout: 'clear',
})

const title = post.value?.title

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
        v-if="post?.image"
        class="image-container flex h-96 mb-8"
      >
        <NuxtImg
          :src="post?.image"
          class="w-full object-cover rounded-2xl"
          format="webp"
        />
      </div>

      <div
        v-if="post?.content"
        class="mb-8"
      >
        {{ post?.content }}
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
    <USeparator class="mb-8" />
    <div>
      <h3 class="text-sm font-semibold text-gray-700 mb-3">
        Комментарии ({{ post?.comments_count }})
      </h3>

      <div
        v-if="post?.comments?.length"
        class="space-y-4"
      >
        <div
          v-for="comment in post.comments"
          :key="comment.id"
          class="flex gap-3"
        >
          <div class="flex-shrink-0">
            <div
              class="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center"
            >
              <UIcon
                name="i-lucide-user"
                class="text-gray-500 text-xs"
              />
            </div>
          </div>
          <div class="flex-1">
            <div class="text-sm font-medium text-gray-800">
              {{ comment.user.first_name }}
            </div>
            <div class="text-sm text-gray-600 mt-1">
              {{ comment.content }}
            </div>
            <div class="text-xs text-gray-400 mt-1">
              {{ new Date(comment.created_at).toLocaleDateString() }}
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="text-sm text-gray-500"
      >
        Пока нет комментариев
      </div>
    </div>
  </main>
</template>
