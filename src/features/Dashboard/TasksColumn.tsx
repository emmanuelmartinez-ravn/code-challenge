import type { Status } from '@constants/Status'
import type { Task } from '@constants/Task'
import { statusToLabel } from '@constants/utils'
import TaskCard from './TaskCard'
import TaskCardSkeleton from './TaskCardSkeleton'
import './TasksColumn.css'

const SKELETON_CARDS_COUNT = 1

function TasksColumn({
  status,
  tasks,
  loading,
}: {
  readonly status: Status
  readonly tasks?: Task[]
  readonly loading?: boolean
}) {
  if (!loading && !tasks) {
    return null
  }

  return (
    <div className="tasks-column" key={status}>
      <h2 className="body body--l">
        {statusToLabel(status)}
        {!loading && ` (${tasks!.length})`}
      </h2>

      <div className="tasks-column__tasks">
        {loading
          ? Array.from({ length: SKELETON_CARDS_COUNT }, (_, index) => (
              <TaskCardSkeleton key={index} />
            ))
          : tasks!.map((task) => <TaskCard key={task.id} task={task} />)}
      </div>
    </div>
  )
}

export default TasksColumn
