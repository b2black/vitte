<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = v.object({
  first_name: v.pipe(v.string(), v.nonEmpty()),
  last_name: v.pipe(v.string(), v.nonEmpty()),
  email: v.pipe(v.string(), v.nonEmpty(), v.email()),
  password: v.pipe(v.string(), v.nonEmpty(), v.minLength(6)),
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
})

const toast = useToast()
const loading = ref(false)
const status = ref('')
const message = ref('')

const emit = defineEmits(['login', 'success'])
async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  status.value = 'loading'
  message.value = 'Загрузка'

  const result = await useFetch('/api/auth/register', {
    method: 'POST',
    body: event.data,
  })

  loading.value = false

  if (result.error.value?.data?.error) {
    const errorMessage = result.error?.value?.data?.message || 'Произошла неизвестная ошибка'
    toast.add({ title: 'Произошла ошибка', description: errorMessage, color: 'error' })
    status.value = 'error'
    message.value = errorMessage
    return
  }
  else {
    status.value = 'success'
    message.value = result.data?.value?.message ?? 'Пользователь успешно зарегистрирован'
    toast.add({ title: 'Успешно', description: result.data?.value?.message || 'Пользователь успешно зарегистрирован', color: 'success' })
    emit('success')
  }
}

defineExpose({
  status,
  message,
})
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
        label="Email"
        name="email"
        required
      >
        <UInput
          v-model="state.email"
          class="w-full"
          :disabled="loading"
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
          class="w-full"
          :disabled="loading"
        />
      </UFormField>
    </div>
    <div class="flex justify-between gap-4 mt-8">
      <div class="flex gap-2">
        <ULink
          @click.prevent="emit('login')"
        >
          Есть аккаунт?
        </ULink>
      </div>
      <UButton
        type="submit"
        :loading="loading"
        color="primary"
      >
        Зарегистрироваться
      </UButton>
    </div>
  </UForm>
</template>

<style scoped>

</style>
