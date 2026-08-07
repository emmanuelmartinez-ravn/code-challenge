import { gql, type TypedDocumentNode } from '@apollo/client'
import type { UpdateTaskResponse, UpdateTaskVariables } from '@constants/Task'

export const UPDATE_TASK: TypedDocumentNode<
  UpdateTaskResponse,
  UpdateTaskVariables
> = gql`
  mutation UpdateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      id
      assignee {
        id
        avatar
        fullName
      }
      createdAt
      creator {
        id
        avatar
        fullName
      }
      dueDate
      name
      pointEstimate
      position
      status
      tags
    }
  }
`
