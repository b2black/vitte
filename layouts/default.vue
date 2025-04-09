<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'
</script>

<template>
  <div class="main-layout">
    <AppHeader />
    <slot />
    <AppFooter />
  </div>
</template>
