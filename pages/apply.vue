<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'
import { FetchError } from 'ofetch'

const title = 'Записаться на обучение'

useHead({
  title,
})

const { user } = useUserSession()
const schema = v.object({
  email: v.pipe(v.string(), v.nonEmpty(), v.email()),
  name: v.pipe(v.string(), v.nonEmpty()),
  user_id: v.optional(v.number()),
  service_id: v.number(),
  message: v.pipe(v.string()),
})

const route = useRoute()

const { data: servicesRes } = await useLazyFetch(`/api/services/`)

const services = computed(() => {
  return servicesRes?.value?.data.map(item => ({
    value: item.id,
    label: item.label,
  }))
})
const loading = ref(false)

const toast = useToast()

const serviceQuery = ref(route.query?.service ? parseInt(route.query?.service as string) : undefined)
const serviceExists = computed(() => {
  if (typeof services.value === 'undefined') {
    return false
  }

  return services.value.findIndex(item => item?.value === serviceQuery.value) >= 0
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
  email: user?.value?.email ?? '',
  name: user?.value?.first_name ?? '',
  user_id: user?.value?.id ?? undefined,
  service_id: serviceExists.value ? serviceQuery.value : undefined,
  message: '',
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    loading.value = true

    const result = await $fetch('/api/services/applications', {
      method: 'POST',
      body: event.data,
      lazy: true,
    })

    toast.add({ title: 'Спасибо', description: result.message, color: 'success' })
  }
  catch (e) {
    if (e instanceof FetchError) {
      const errorMessage = e?.data?.message || 'Произошла неизвестная ошибка'
      toast.add({ title: 'Ошибка', description: errorMessage, color: 'error' })
    }
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <main>
    <UForm
      :schema="schema"
      :state="state"
      class="space-y-4 w-full"
      :disabled="loading"
      @submit="onSubmit"
    >
      <UFormField
        label="Программа обучения"
        name="service_id"
        required
      >
        <USelect
          v-model="state.service_id"
          :items="services"
          class="w-full"
        />
      </UFormField>
      <UFormField
        label="Имя"
        name="name"
        required
      >
        <UInput
          v-model="state.name"
          type="text"
          :disabled="!!user?.first_name"
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
          :disabled="!!user?.email"
          placeholder="Введите ваш email"
          class="w-full"
        />
      </UFormField>

      <UFormField
        label="Сообщение"
        name="message"
        class="w-full"
      >
        <UTextarea
          v-model="state.message"
          placeholder="Сообщение"
          class="w-full"
        />
      </UFormField>

      <UButton
        type="submit"
        :loading="loading"
        color="primary"
      >
        Записаться
      </UButton>
    </UForm>
  </main>
</template>
