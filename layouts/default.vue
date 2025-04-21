<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'
import Breadcrumbs from '~/components/Breadcrumbs.vue'

const route = useRoute()
const title = computed(() => route.meta.title as string)
const isIndex = computed(() => route.name === 'index')
</script>

<template>
  <div class="main-layout">
    <AppHeader />
    <Breadcrumbs />
    <UContainer class="min-h-screen py-8">
      <h1
        v-if="title && !isIndex"
        class="text-2xl font-bold mb-8"
      >
        {{ title }}
      </h1>
      <slot />
    </UContainer>
    <AppFooter />
  </div>
</template>
