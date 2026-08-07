import { gql, type TypedDocumentNode } from '@apollo/client'
import type { GetProfileResponse } from '@constants/User'

export const GET_PROFILE: TypedDocumentNode<GetProfileResponse> = gql`
  query GetProfile {
    profile {
      id
      avatar
      fullName
      email
      type
      createdAt
      updatedAt
    }
  }
`
