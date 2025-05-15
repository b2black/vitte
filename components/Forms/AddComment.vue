<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

const { user, loggedIn } = useUserSession()

const props = defineProps<{
  id: number
}>()

const schema = v.object({
  content: v.pipe(v.string(), v.nonEmpty()),
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
  user_id: user?.value?.id,
  post_id: props.id,
  content: '',
})

const toast = useToast()
const loading = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true

  const result = await useFetch('/api/blog/comments', {
    method: 'POST',
    body: event.data,
  })

  loading.value = false

  if (result.error.value?.data?.error) {
    const errorMessage = result.error?.value?.data?.message || 'Произошла неизвестная ошибка'
    toast.add({ title: 'Ошибка', description: errorMessage, color: 'error' })
    return
  }

  toast.add({ title: 'Спасибо', description: result.data.value?.message, color: 'success' })

  setTimeout(() => {
    state.content = ''
    window.location.reload()
  }, 500)
}
</script>

<template>
  <div class="py-8">
    <div v-if="!loggedIn">
      Пожалуйста авторизуйтесь, чтобы оставить комментарий
    </div>
    <div v-else>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4 w-full"
        :loading="loading"
        @submit="onSubmit"
      >
        <UFormField
          label="Сообщение"
          name="message"
          required
          class="w-full"
        >
          <UTextarea
            v-model="state.content"
            :disabled="loading"
            placeholder="Сообщение"
            autocomplete="off"
            class="w-full"
          />
        </UFormField>

        <UButton
          type="submit"
          :loading="loading"
          color="primary"
        >
          Отправить
        </UButton>
      </UForm>
    </div>
  </div>
</template>

<style scoped>

</style>
