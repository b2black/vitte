<script setup lang="ts">
import CommentsList from '~/components/Blog/CommentsList.vue'
import AddComment from '~/components/Forms/AddComment.vue'

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
      <CommentsList
        :comments_count="post?.comments_count ? Number(post.comments_count) : undefined"
        :comments="post?.comments"
      />
      <AddComment
        v-if="post?.id"
        :id="post?.id"
      />
    </div>
  </main>
</template>
