<script setup lang="ts">
import { ref } from 'vue'
import * as v from 'valibot'

const { user } = useUserSession()

const schema = v.object({
  first_name: v.pipe(v.string(), v.nonEmpty()),
  last_name: v.pipe(v.string(), v.nonEmpty()),
  email: v.pipe(v.string(), v.nonEmpty(), v.email()),
  password: v.pipe(v.string()),
})

const loading = ref(false)
const state = reactive({
  first_name: user.first_name,
  last_name: user.last_name,
  email: user.email,
  password: '',
})

async function onSubmit() {
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
