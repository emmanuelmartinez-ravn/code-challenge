import './DashboardPage.css'
import { useQuery } from '@apollo/client/react'
import { GET_TASKS } from '../../graphql/queries/task'
import type { Status } from '@constants/Status'
import type { Task } from '@constants/Task'
import TasksColumn from './TasksColumn'
import { STATUSES } from '../../constants/Status'
function DashboardPage() {
  const { data, loading } = useQuery(GET_TASKS, {
    variables: {
      input: {},
    },
  })

  const tasksByStatus: Map<Status, Task[]> = new Map()

  STATUSES.forEach((status) => {
    tasksByStatus.set(status, [])
  })

  if (data?.tasks) {
    data.tasks.forEach((task) => {
      tasksByStatus.get(task.status)?.push(task)
    })

    tasksByStatus.forEach((tasks) => {
      tasks.sort((a, b) => a.position - b.position)
    })
  }

  return (
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
    </section>
  )
}

export default DashboardPage
