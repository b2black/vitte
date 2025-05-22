<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'
import { FetchError } from 'ofetch'

const schema = v.object({
  password: v.pipe(
    v.string(),
    v.nonEmpty(),
    v.minLength(6),
  ),
  confirmPassword: v.pipe(
    v.string(),
    v.nonEmpty(),
  ),
})

type Schema = v.InferOutput<typeof schema>

const route = useRoute()
const state = reactive({
  password: '',
  confirmPassword: '',
})

const toast = useToast()
const loading = ref(false)

const emit = defineEmits(['success'])

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (state.password !== state.confirmPassword) {
    toast.add({ title: 'Ошибка', description: 'Пароли не совпадают', color: 'error' })
    return
  }

  try {
    loading.value = true

    const result = await $fetch('/api/auth/reset-password', {
      method: 'POST',
      body: {
        token: route.query.token,
        password: event.data.password,
      },
    })

    toast.add({ title: 'Успешно', description: result.message, color: 'success' })
    state.password = ''
    state.confirmPassword = ''
    emit('success')
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
      label="Новый пароль"
      name="password"
      required
    >
      <UInput
        v-model="state.password"
        type="password"
        :disabled="loading"
        placeholder="Введите новый пароль"
        class="w-full"
      />
    </UFormField>

    <UFormField
      label="Подтверждение пароля"
      name="confirmPassword"
      required
    >
      <UInput
        v-model="state.confirmPassword"
        type="password"
        :disabled="loading"
        placeholder="Подтвердите новый пароль"
        class="w-full"
      />
    </UFormField>

    <div class="flex justify-end gap-4 mt-8">
      <UButton
        type="submit"
        :loading="loading"
        color="primary"
      >
        Сохранить новый пароль
      </UButton>
    </div>
  </UForm>
</template>
