<script setup lang="ts">
import RegisterForm from '~/components/Forms/RegisterForm.vue'
import UsersList from '~/components/Users/UsersList.vue'
import LoginForm from '~/components/Forms/LoginForm.vue'

const { loggedIn, session } = useUserSession()
</script>

<template>
  <UContainer>
    {{ loggedIn }}
    {{ session }}
    <register-form />
    <users-list />
    <login-form />
  </UContainer>
</template>
