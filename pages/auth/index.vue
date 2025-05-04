<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

navigateTo('/auth/login')
</script>
