import type { NavigationMenuItem } from '@nuxt/ui'

export async function useMenu() {
  const { data: apiMenuItems, error } = await useFetch<NavigationMenuItem[]>('/api/menu')

  const menuItems = ref<NavigationMenuItem[] | null>([])

  if (error.value) {
    useToast().add({
      title: 'Ошибка',
      description: 'Не удалось получить элементы меню',
      color: 'error',
    })
  }
  else {
    menuItems.value = apiMenuItems.value
  }

  return {
    menuItems,
  }
}
