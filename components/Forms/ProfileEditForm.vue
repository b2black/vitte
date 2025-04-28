<script setup lang="ts">
import { ref } from 'vue'
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

const { user, fetch: refreshSession } = useUserSession()

const schema = v.object({
  first_name: v.pipe(v.string(), v.nonEmpty()),
  last_name: v.pipe(v.string(), v.nonEmpty()),
  password: v.pipe(v.string()),
  id: v.pipe(v.number()),
})

type Schema = v.InferOutput<typeof schema>
const toast = useToast()

const loading = ref(false)
const state = reactive({
  first_name: user.value.first_name,
  last_name: user.value.last_name,
  password: '',
  id: user.value.id,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  const result = await useFetch(`/api/users/${user.value.id}`, {
    method: 'PUT',
    body: event.data,
  })
  loading.value = false
  if (result.error.value?.data?.error) {
    const errorMessage = result.error?.value?.data?.message || 'Произошла неизвестная ошибка'
    toast.add({ title: 'Ошибка', description: errorMessage, color: 'error' })
    return
  }
  toast.add({ title: 'Успешно', description: 'Профиль обновлен', color: 'success' })
  await refreshSession()
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
    <div class="grid grid-cols-2 gap-4">
      <UFormField
        label="Имя"
        name="first_name"
        required
      >
        <UInput
          v-model="state.first_name"
          type="text"
          :disabled="loading"
          class="w-full"
        />
      </UFormField>
      <UFormField
        label="Фамилия"
        name="last_name"
        required
      >
        <UInput
          v-model="state.last_name"
          type="text"
          :disabled="loading"
          class="w-full"
        />
      </UFormField>
      <UFormField
        label="Email (для изменения обратитесь к администратору)"
        name="email"
      >
        <UInput
          :model-value="user.email"
          class="w-full"
          :disabled="true"
        />
      </UFormField>
      <UFormField
        label="Пароль"
        name="password"
      >
        <UInput
          v-model="state.password"
          type="password"
          class="w-full"
          :disabled="loading"
        />
      </UFormField>
    </div>
    <div class="flex justify-between gap-4 mt-8">
      <UButton
        type="submit"
        :loading="loading"
        color="primary"
      >
        Сохранить
      </UButton>
    </div>
  </UForm>
</template>
