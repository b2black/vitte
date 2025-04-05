<script setup lang="ts">
import * as v from 'valibot';
import type { FormSubmitEvent } from '@nuxt/ui';

const schema = v.object({
  first_name: v.pipe(v.string(), v.nonEmpty()),
  last_name: v.pipe(v.string(), v.nonEmpty()),
  email: v.pipe(v.string(), v.nonEmpty(), v.email()),
  password: v.pipe(v.string(), v.nonEmpty(), v.minLength(6)),
});

type Schema = v.InferOutput<typeof schema>;

const state = reactive({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
});

const toast = useToast();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const res = await useFetch('/api/users/', {
    method: 'POST',
    body: event.data,
  });

  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' });
  console.log(event.data);
}
</script>

<template>
  <UForm
    :schema="schema"
    :state="state"
    class="space-y-4 w-full"
    @submit="onSubmit"
  >
    <div class="grid grid-cols-2 gap-4">
      <UFormField label="Имя" name="first_name" required>
        <UInput v-model="state.first_name" type="text" class="w-full" />
      </UFormField>
      <UFormField label="Фамилия" name="last_name" required>
        <UInput v-model="state.last_name" type="text" class="w-full"/>
      </UFormField>
      <UFormField label="Email" name="email" required>
        <UInput v-model="state.email" class="w-full" />
      </UFormField>
      <UFormField label="Пароль" name="password" required>
        <UInput v-model="state.password" type="password" class="w-full"/>
      </UFormField>
    </div>
    <div class="flex gap-4">
      <UButton type="submit">
        Отправить
      </UButton>
    </div>
  </UForm>
</template>

<style scoped>

</style>
