import { gql, type TypedDocumentNode } from '@apollo/client'
import type { DeleteTaskResponse, DeleteTaskVariables } from '@constants/Task'

export const DELETE_TASK: TypedDocumentNode<
  DeleteTaskResponse,
  DeleteTaskVariables
> = gql`
  mutation DeleteTask($input: DeleteTaskInput!) {
    deleteTask(input: $input) {
      id
    }
  }
`
