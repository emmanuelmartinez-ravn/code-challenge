import TaskForm, {
  type TaskFormValues,
} from '@shared/components/TaskForm/TaskForm'
import { useToast } from '@shared/components/Toast/useToast'
import { useTaskMutations } from '@graphql/hooks/useTaskMutations'

function AddTaskForm({ onClose }: { readonly onClose: () => void }) {
  const showToast = useToast()

  const { createTask } = useTaskMutations()

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
