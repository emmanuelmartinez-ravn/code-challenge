import Accordion from '@shared/components/Accordion/Accordion'
import './MyTaskPage.css'
import TablesHeader from './TablesHeader'
import TaskTable from './TasksTable'
import type { Status } from '@constants/Status'
import { useQuery } from '@apollo/client/react'
import { GET_TASKS } from '../../graphql/queries/task'
import type { Task } from '@constants/Task'

const statuses: Status[] = [
  'BACKLOG',
  'CANCELLED',
  'DONE',
  'IN_PROGRESS',
  'TODO',
]

function MyTaskPage() {
  const { data } = useQuery(GET_TASKS, {
    variables: {
      input: {},
    },
  })

  const tasksByStatus: Map<Status, Task[]> = new Map()

  statuses.forEach((status) => {
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
    <section className="my-task">
      <h1 className="sr-only">My task</h1>
      <div className="my-task__content">
        <TablesHeader />
        <div className="table__accordions">
          {tasksByStatus.size > 0 &&
            statuses.map((status) => (
              <Accordion
                key={status}
                title={status}
                subtitle={`(${tasksByStatus.get(status)?.length})`}
              >
                <TaskTable tasks={tasksByStatus.get(status)} />
              </Accordion>
            ))}
        </div>
      </div>
    </section>
  )
}

export default MyTaskPage
