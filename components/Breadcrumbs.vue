<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'

const route = useRoute()

const crumbs = computed(() => {
  const pathArray = route.path.split('/').filter(i => i)
  const breadcrumbs = []
  let path = ''

  breadcrumbs.push({
    label: 'Главная',
    to: '/',
  })

  pathArray.forEach((item) => {
    path = `${path}/${item}`

    const matchedRoute = route.matched.find((r) => {
      const routePath = r.path.replace(/\/:.*?(?=\/|$)/g, '/[^/]+')
      return new RegExp(`^${routePath}$`).test(path)
    })

    const title = matchedRoute?.meta?.title

    if (title) {
      breadcrumbs.push({
        label: title,
        to: path,
      })
    }
  })

  return breadcrumbs
}) satisfies ComputedRef<BreadcrumbItem[]>
</script>

<template>
  <UContainer
    v-if="route?.matched[0]?.name !== 'index'"
    class="pt-8 pb-4"
  >
    <UBreadcrumb :items="crumbs" />
  </UContainer>
</template>
