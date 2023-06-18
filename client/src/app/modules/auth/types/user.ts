export type User = {
  id?: string,
  name: string,
  company: string
  email: string
  role: 'user' | 'admin' | ''
}
