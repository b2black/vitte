export async function useUserRole() {
  const { user } = await useUserSession()

  return {
    role: user?.value?.role?.alias,
    isAdmin: user?.value?.role?.alias === 'admin',
    isTeacher: user?.value?.role?.alias === 'teacher',
    isStudent: user?.value?.role?.alias === 'student',
    isDefault: user?.value?.role?.alias === 'default',
  }
}
