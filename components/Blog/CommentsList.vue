<script setup lang="ts">
import type { SerializeObject } from 'nitropack'

const props = defineProps<{
  comments_count?: number
  comments: SerializeObject<{
    id: number
    created_at: Date
    content: string
    user_id: number
    post_id: number
    user: {
      id: number
      first_name: string
      last_name: string
    }
  }>[] | undefined
}>()
</script>

<template>
  <h3 class="text-sm font-semibold text-gray-700 mb-3">
    Комментарии ({{ props?.comments_count }})
  </h3>

  <div
    v-if="props?.comments?.length"
    class="space-y-4"
  >
    <div
      v-for="comment in props.comments"
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
</template>

<style scoped>

</style>
