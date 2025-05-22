<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'
import { FetchError } from 'ofetch'

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

const emit = defineEmits(['forgotPassword', 'register', 'success'])

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    loading.value = true

    await $fetch('/api/auth/login', {
      method: 'POST',
      body: event.data,
    })

    toast.add({ title: 'Успешно', description: 'Добро пожаловать!', color: 'success' })
    emit('success')
    await refreshSession()
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
