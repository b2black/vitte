<script setup lang="ts">
import RegisterForm from '~/components/Forms/RegisterForm.vue'
</script>

<template>
  <main>
    <h1 class="text-2xl font-bold mb-8">
      Регистрация
    </h1>
    <RegisterForm @login="navigateTo('/auth/login')" />
  </main>
</template>

<style scoped>

</style>
