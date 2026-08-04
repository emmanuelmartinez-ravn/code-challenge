import './DashboardPage.css'
import TaskCard from './TaskCard'
import { useQuery } from '@apollo/client/react'
import { GET_TASKS } from '../../graphql/queries/task'
import type { Status } from '@constants/Status'

const statuses: Status[] = [
  'BACKLOG',
  'CANCELLED',
  'DONE',
  'IN_PROGRESS',
  'TODO',
]

function DashboardPage() {
  const { data } = useQuery(GET_TASKS, {
    variables: {
      input: {},
    },
  })

  console.log(data)

  return (
    <section className="dashboard">
      <h1 className="sr-only">Dashboard</h1>

      <div className="dashboard__columns">
        {statuses.map((status) => (
          <div className="dashboard__columns__column" key={status}>
            <h2 className="body body--l">
              {status} (
              {data?.tasks.filter((task) => task.status === status).length})
            </h2>

            <div className="dashboard__columns__column__tasks">
              {data?.tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default DashboardPage
