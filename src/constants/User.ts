export type User = {
  id: string
  avatar: string
  fullName: string
}

export type GetUsersResponse = {
  users: User[]
}
