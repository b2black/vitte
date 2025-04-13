<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

const { fetch: refreshSession } = useUserSession()
const schema = v.object({
  email: v.pipe(v.string(), v.nonEmpty(), v.email()),
  password: v.pipe(v.string(), v.nonEmpty(), v.minLength(6)),
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
  email: '',
  password: '',
})

const toast = useToast()
const loading = ref(false)

const emit = defineEmits(['forgotPassword', 'register'])

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true

  const result = await useFetch('/api/auth/login', {
    method: 'POST',
    body: event.data,
  })

  loading.value = false

  if (result.error.value?.data?.error) {
    const errorMessage = result.error?.value?.data?.message || 'Произошла неизвестная ошибка'
    toast.add({ title: 'Ошибка', description: errorMessage, color: 'error' })
    return
  }

  toast.add({ title: 'Успешно', description: 'Добро пожаловать!', color: 'success' })
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

    <UFormField
      label="Пароль"
      name="password"
      required
    >
      <UInput
        v-model="state.password"
        type="password"
        :disabled="loading"
        placeholder="Введите ваш пароль"
        class="w-full"
      />
    </UFormField>

    <div class="flex justify-between gap-4 mt-8">
      <div class="flex gap-8">
        <ULink @click.prevent="emit('forgotPassword')">
          Забыли пароль?
        </ULink>
        <ULink @click.prevent="emit('register')">
          Регистрация
        </ULink>
      </div>
      <UButton
        type="submit"
        :loading="loading"
        color="primary"
      >
        Войти
      </UButton>
    </div>
  </UForm>
</template>

<style scoped>
</style>
