export default function useConfirmEmail() {
  const route = useRoute()
  const status = ref<'loading' | 'success' | 'error'>('loading')
  const message = ref<string | null>(null)
  const confirmEmail = async () => {
    status.value = 'loading'
    message.value = 'Выполняется проверка токена'
    const token = route.query.token as string

    if (!token) {
      navigateTo('/auth/register')
      return
    }

    try {
      const result = await $fetch('/api/auth/confirm', {
        body: { token },
        method: 'POST',
      })

      message.value = result.message
      status.value = 'success'
    }
    catch (e: unknown) {
      message.value = (e as { response?: { _data?: { message?: string } } }).response?._data?.message || (e as Error).message || 'Неизвестная ошибка'
      status.value = 'error'
    }
  }

  return {
    confirmEmail,
    message,
    status,
  }
}
