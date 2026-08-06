import { gql, type TypedDocumentNode } from '@apollo/client'
import type { CreateTaskResponse, CreateTaskVariables } from '@constants/Task'

export const CREATE_TASK: TypedDocumentNode<
  CreateTaskResponse,
  CreateTaskVariables
> = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
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
