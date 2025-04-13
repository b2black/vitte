<script setup lang="ts">
const { user } = useUserSession()
</script>

<template>
  <main>
    <h1>Главная</h1>
    <div>
      {{ user }}
    </div>
  </main>
</template>
