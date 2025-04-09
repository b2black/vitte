<script setup lang="ts">
const { user } = useUserSession()
</script>

<template>
  <UContainer class="min-h-screen py-16">
    {{ user }}
  </UContainer>
</template>
