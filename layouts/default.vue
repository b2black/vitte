<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'
import BreadCrumbs from '~/components/BreadCrumbs.vue'

const route = useRoute()

const title = null
const isIndex = computed(() => route.name === 'index')
</script>

<template>
  <div class="main-layout">
    <AppHeader />
    <bread-crumbs />
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
