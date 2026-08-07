import './DashboardPage.css'
import { useOutletContext } from 'react-router'
import { DragDropContext, type DropResult } from '@hello-pangea/dnd'
import { useMutation } from '@apollo/client/react'
import { STATUSES, type Status } from '@constants/Status'
import TasksColumn from './TasksColumn'
import NoResults from './NoResults'
import type { ControlsOutletContext } from '@core/layout/ControlsLayout/ControlsLayout'
import { GET_TASKS } from '@graphql/queries/task'
import { UPDATE_TASK } from '@graphql/mutations/updateTask'

function DashboardPage() {
  const { tasksByStatus, loading } = useOutletContext<ControlsOutletContext>()

  const [updateTask] = useMutation(UPDATE_TASK, {
    refetchQueries: [{ query: GET_TASKS, variables: { input: {} } }],
  })

  const hasResults = Array.from(tasksByStatus.values()).some(
    (tasks) => tasks.length > 0,
  )

  const handleDragEnd = ({ source, destination, draggableId }: DropResult) => {
    if (!destination) {
      return
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return
    }

    const sourceStatus = source.droppableId as Status
    const draggedTask = tasksByStatus
      .get(sourceStatus)
      ?.find((task) => task.id === draggableId)

    if (!draggedTask) {
      return
    }

    const destinationStatus = destination.droppableId as Status
    const destinationTasks = tasksByStatus.get(destinationStatus) ?? []
    const otherTasks = destinationTasks.filter(
      (task) => task.id !== draggableId,
    )

    const before = otherTasks[destination.index - 1]
    const after = otherTasks[destination.index]

    let position: number

    if (!before && !after) {
      position = 0
    } else if (!before) {
      position = after.position - 1
    } else if (!after) {
      position = before.position + 1
    } else {
      position = (before.position + after.position) / 2
    }

    const optimisticTask = {
      ...draggedTask,
      __typename: 'Task',
      status: destinationStatus,
      position,
    }

    updateTask({
      variables: {
        input: {
          id: draggableId,
          status: destinationStatus,
          position,
        },
      },
      optimisticResponse: {
        updateTask: optimisticTask,
      },
    })
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <section aria-busy={loading} className="dashboard">
        <h1 className="sr-only">Dashboard</h1>

        <div className="dashboard__columns">
          {STATUSES.map((status) => (
            <TasksColumn
              key={status}
              loading={loading}
              status={status}
              tasks={tasksByStatus.get(status)}
            />
          ))}
        </div>

        {!loading && !hasResults && <NoResults />}
      </section>
    </DragDropContext>
  )
}

export default DashboardPage
