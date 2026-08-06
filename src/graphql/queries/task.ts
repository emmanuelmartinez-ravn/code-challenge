import { gql, type TypedDocumentNode } from '@apollo/client'
import type { GetTasksResponse, GetTasksVariables } from '@constants/Task'

export const GET_TASKS: TypedDocumentNode<GetTasksResponse, GetTasksVariables> =
  gql`
    query GetTasks($input: FilterTaskInput!) {
      tasks(input: $input) {
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
