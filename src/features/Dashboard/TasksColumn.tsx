import { Droppable, Draggable } from '@hello-pangea/dnd'
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

      {loading ? (
        <div className="tasks-column__tasks">
          {Array.from({ length: SKELETON_CARDS_COUNT }, (_, index) => (
            <TaskCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <Droppable droppableId={status}>
          {(droppableProvided) => (
            <div
              className="tasks-column__tasks"
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
            >
              {tasks!.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(draggableProvided) => (
                    <TaskCard
                      task={task}
                      innerRef={draggableProvided.innerRef}
                      draggableProps={draggableProvided.draggableProps}
                      dragHandleProps={draggableProvided.dragHandleProps}
                    />
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      )}
    </div>
  )
}

export default TasksColumn
