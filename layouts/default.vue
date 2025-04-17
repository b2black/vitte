<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'
import Breadcrumbs from '~/components/Breadcrumbs.vue'
</script>

<template>
  <div class="main-layout">
    <AppHeader />
    <Breadcrumbs />
    <UContainer class="min-h-screen py-8">
      <slot />
    </UContainer>
    <AppFooter />
  </div>
</template>
