export default defineNuxtRouteMiddleware(() => {
  const { loggedIn } = useUserSession()

  if (!loggedIn.value) {
    return abortNavigation("Вы еще не авторизованы")
  }
})
