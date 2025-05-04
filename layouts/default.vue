<script setup lang="ts">
const breadcrumbItems = useBreadcrumbItems()
const currentItem = computed(() => breadcrumbItems.value.find(item => item.current))
</script>

<template>
  <div class="main-layout">
    <AppHeader />
    <UContainer
      class="pt-8 pb-4"
    >
      <BreadCrumbs />
    </UContainer>
    <UContainer class="min-h-screen py-8">
      <h1
        v-if="currentItem && currentItem.label"
        class="text-2xl font-bold mb-8"
      >
        {{ currentItem.label }}
      </h1>
      <slot />
    </UContainer>
    <AppFooter />
  </div>
</template>
