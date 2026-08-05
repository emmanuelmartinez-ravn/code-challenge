import type { Status } from '@constants/Status'
import type { Task } from '@constants/Task'
import TaskCard from './TaskCard'
import './TasksColumn.css'

function TasksColumn({
  status,
  tasks,
}: {
  readonly status: Status
  readonly tasks?: Task[]
}) {
  if (!tasks) {
    return null
  }
  return (
    <div className="tasks-column" key={status}>
      <h2 className="body body--l">
        {status} ({tasks.length})
      </h2>

      <div className="tasks-column__tasks">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}

export default TasksColumn
