<script lang="ts" setup>
const { data: roles } = await useFetch('/api/roles');
</script>

<template>
  <ul v-if="roles?.length">
    <li v-for="role in roles" :key="role.id"> {{ role.name }}</li>
  </ul>
</template>
