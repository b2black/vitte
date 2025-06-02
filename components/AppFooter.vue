<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-gray-50 border-t border-gray-200">
    <UContainer class="py-12">
      <div>
        <NuxtLink
          to="/"
          class="flex items-center gap-2"
        >
          <span class="font-bold text-lg">МУИВ</span>
        </NuxtLink>
        <p class="text-sm text-gray-600">
          Московский университет имени Витте - один из ведущих негосударственных вузов России
        </p>
      </div>
      <div class="mt-8 border-t border-gray-900/10 pt-8">
        <p class="text-xs leading-5 text-gray-500">
          Разработал Мелков Богдан Алексеевич <br /> {{ currentYear }}
        </p>
      </div>
    </UContainer>
  </footer>
</template>
