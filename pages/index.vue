<script setup lang="ts">
const { user } = useUserSession()
</script>

<template>
  <main>
    <h1>МУИВ</h1>
    <div>
      {{ user }}
    </div>
  </main>
</template>
