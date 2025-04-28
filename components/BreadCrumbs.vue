<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'

const route = useRoute()
const router = useRouter()

const items = computed(() => {
  const fullPath = route.path
  const requestPath = fullPath.startsWith('/')
    ? fullPath.substring(1)
    : fullPath
  const crumbs = requestPath.split('/')
  const parts = []

  parts.push({
    label: 'Главная',
    to: '/',
  })

  let path = ''
  crumbs.forEach((crumb) => {
    if (crumb) {
      path = `${path}/${crumb}`
      const part = router.getRoutes().find(r => r.path === path)
      if (part) {
        if (part.meta.title) {
          parts.push({
            label: part.meta.title,
            to: part.path,
          })
        }
      }
    }
  })

  return parts
}) satisfies ComputedRef<BreadcrumbItem[]>
</script>

<template>
  <UContainer
    v-if="route?.matched[0]?.name !== 'index'"
    class="pt-8 pb-4"
  >
    <UBreadcrumb :items="items" />
  </UContainer>
</template>
