export default defineNuxtRouteMiddleware(async () => {
  const { isAdmin } = await useUserRole()

  if (!isAdmin) {
    return abortNavigation('Не хватает прав')
  }
})
