export type User = {
  id: string
  avatar: string
  fullName: string
}

export type GetUsersResponse = {
  users: User[]
}

export type UserType = 'ADMIN' | 'CANDIDATE'

export type Profile = {
  id: string
  avatar: string
  fullName: string
  email: string
  type: UserType
  createdAt: string
  updatedAt: string
}

export type GetProfileResponse = {
  profile: Profile
}
