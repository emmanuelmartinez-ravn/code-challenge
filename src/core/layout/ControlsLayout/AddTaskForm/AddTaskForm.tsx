import { useMutation } from '@apollo/client/react'
import TaskForm, {
  type TaskFormValues,
} from '@shared/components/TaskForm/TaskForm'
import { useToast } from '@shared/components/Toast/useToast'
import { GET_TASKS } from '@graphql/queries/task'
import { CREATE_TASK } from '@graphql/mutations/createTask'

function AddTaskForm({ onClose }: { readonly onClose: () => void }) {
  const showToast = useToast()

  const [createTask] = useMutation(CREATE_TASK, {
    refetchQueries: [GET_TASKS],
  })

  const handleSubmit = async (values: TaskFormValues) => {
    try {
      await createTask({ variables: { input: values } })
    } catch {
      showToast("Couldn't create the task. Please try again.", 'error')
      return
    }

    showToast('Task created.', 'success')
    onClose()
  }

  return (
    <TaskForm submitLabel="Create" onSubmit={handleSubmit} onCancel={onClose} />
  )
}

export default AddTaskForm
