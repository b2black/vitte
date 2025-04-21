<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'
</script>

<template>
  <div class="main-layout">
    <AppHeader />
    <UContainer class="min-h-screen py-8">
      <slot />
    </UContainer>
    <AppFooter />
  </div>
</template>
