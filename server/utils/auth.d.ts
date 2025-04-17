declare module '#auth-utils' {
  interface User {
    id?: number
    first_name?: string
    last_name?: string
    email?: string
    created_at?: string
    role?: {
      id?: number
      name?: string
      alias?: string
      created_at?: Date
      updated_at?: Date
    }
  }
}
