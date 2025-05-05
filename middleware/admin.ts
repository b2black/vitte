export default defineNuxtRouteMiddleware(async () => {
  const { isAdmin } = await useUserRole()

  if (!isAdmin) {
    navigateTo('/profile')
  }
})
