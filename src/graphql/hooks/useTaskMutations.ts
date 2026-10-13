import { useMutation } from '@apollo/client/react'
import { GET_TASKS } from '@graphql/queries/task'
import { CREATE_TASK } from '@graphql/mutations/createTask'
import { UPDATE_TASK } from '@graphql/mutations/updateTask'
import { DELETE_TASK } from '@graphql/mutations/deleteTask'

export function useTaskMutations() {
  const [createTask] = useMutation(CREATE_TASK, {
    refetchQueries: [GET_TASKS],
  })
  const [updateTask] = useMutation(UPDATE_TASK, {
    refetchQueries: [GET_TASKS],
  })
  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: [GET_TASKS],
  })

  return { createTask, updateTask, deleteTask }
}
