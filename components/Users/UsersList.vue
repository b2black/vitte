<script setup lang="ts">
const { data: users } = await useLazyFetch('/api/users')
</script>

<template>
  <div class="users">
    <UCard
      v-for="user in users?.data"
      :key="`user-${user.id}`"
    >
      <template #header>
        {{ user.first_name }} {{ user.last_name }}
      </template>
      email: {{ user.email }}
      role: {{ user.role_name }}
    </UCard>
  </div>
</template>
