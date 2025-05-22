<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'
import { FetchError } from 'ofetch'

const { user } = useUserSession()
const schema = v.object({
  email: v.pipe(v.string(), v.nonEmpty(), v.email()),
  name: v.pipe(v.string(), v.nonEmpty()),
  message: v.pipe(v.string(), v.nonEmpty()),
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
  email: user?.value?.email ?? '',
  name: user?.value?.first_name ?? '',
  message: '',
})

const toast = useToast()
const loading = ref(false)
async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    loading.value = true
    const result = await $fetch('/api/feedback', {
      method: 'POST',
      body: event.data,
    })
    toast.add({ title: 'Спасибо', description: result.data.value?.message, color: 'success' })
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
      label="Имя"
      name="name"
      required
    >
      <UInput
        v-model="state.name"
        type="text"
        :disabled="loading"
        placeholder="Имя"
        class="w-full"
      />
    </UFormField>

    <UFormField
      label="Email"
      name="email"
      required
      class="w-full"
    >
      <UInput
        v-model="state.email"
        type="email"
        :disabled="loading"
        placeholder="Введите ваш email"
        class="w-full"
      />
    </UFormField>

    <UFormField
      label="Сообщение"
      name="message"
      required
      class="w-full"
    >
      <UTextarea
        v-model="state.message"
        :disabled="loading"
        placeholder="Сообщение"
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
</template>
