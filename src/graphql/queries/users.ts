import { gql, type TypedDocumentNode } from '@apollo/client'
import type { GetUsersResponse } from '@constants/User'

export const GET_USERS: TypedDocumentNode<GetUsersResponse> = gql`
  query GetUsers {
    users {
      id
      fullName
      avatar
    }
  }
`
