export default defineNuxtRouteMiddleware(() => {
  const { loggedIn } = useUserSession()

  if (loggedIn.value) {
    return abortNavigation('Вы уже авторизованы')
  }
})
