<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'
import { FetchError } from 'ofetch'

const schema = v.object({
  email: v.pipe(v.string(), v.nonEmpty(), v.email()),
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
  email: '',
})

const toast = useToast()
const loading = ref(false)

const emit = defineEmits(['back', 'success'])

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    loading.value = true

    const result = await $fetch('/api/auth/forgot-password', {
      method: 'POST',
      body: event.data,
    })
    emit('success')
    toast.add({ title: 'Успешно', description: result.message, color: 'success' })
    state.email = ''
  }
  catch (e) {
    if (e instanceof FetchError) {
      const errorMessage = e?.data?.message || 'Произошла неизвестная ошибка'
      toast.add({ title: 'Ошибка', description: errorMessage, color: 'error' })
      return
    }
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <UForm
    :schema="schema"
    :state="state"
    class="space-y-4 w-full"
    :loading="loading"
    @submit="onSubmit"
  >
    <UFormField
      label="Email"
      name="email"
      required
    >
      <UInput
        v-model="state.email"
        type="email"
        :disabled="loading"
        placeholder="Введите ваш email"
        class="w-full"
      />
    </UFormField>

    <div class="flex justify-between gap-4 mt-8">
      <ULink @click.prevent="emit('back')">
        Вернуться к входу
      </ULink>
      <UButton
        type="submit"
        :loading="loading"
        color="primary"
      >
        Отправить
      </UButton>
    </div>
  </UForm>
</template>
