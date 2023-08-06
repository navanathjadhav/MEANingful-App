export type User = {
  _id?: string,
  name: string,
  company: string
  email: string
  role: 'user' | 'admin' | ''
}

export type Token = {
  expires: string
  token: string
}

export type UserResponse = {
  token: string
  user: User
}

export type Socket = {
  activeUserCount: number,
}
