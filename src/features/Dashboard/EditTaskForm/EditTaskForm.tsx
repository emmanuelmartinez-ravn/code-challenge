import TaskForm, {
  type TaskFormValues,
} from '@shared/components/TaskForm/TaskForm'
import { useToast } from '@shared/components/Toast/useToast'
import { useTaskMutations } from '@graphql/hooks/useTaskMutations'
import type { Task } from '@constants/Task'

function EditTaskForm({
  task,
  onClose,
}: {
  readonly task: Task
  readonly onClose: () => void
}) {
  const showToast = useToast()

  const { updateTask } = useTaskMutations()

  const handleSubmit = async (values: TaskFormValues) => {
    try {
      await updateTask({ variables: { input: { id: task.id, ...values } } })
    } catch {
      showToast("Couldn't update the task. Please try again.", 'error')
      return
    }

    showToast('Task updated.', 'success')
    onClose()
  }

  return (
    <TaskForm
      initialTask={task}
      submitLabel="Update"
      onSubmit={handleSubmit}
      onCancel={onClose}
    />
  )
}

export default EditTaskForm
