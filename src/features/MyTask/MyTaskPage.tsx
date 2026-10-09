import Accordion from '@shared/components/Accordion/Accordion'
import './MyTaskPage.css'
import { useOutletContext } from 'react-router'
import TablesHeader from './TablesHeader'
import TaskTable from './TasksTable'
import { STATUSES } from '@constants/Status'
import { statusToLabel } from '@constants/utils'
import type { ControlsOutletContext } from '@core/layout/ControlsLayout/ControlsLayout'
import ErrorState from '@shared/components/ErrorState/ErrorState'

function MyTaskPage() {
  const { tasksByStatus, hasError, retry } =
    useOutletContext<ControlsOutletContext>()

  if (hasError) {
    return (
      <section className="my-task">
        <h1 className="sr-only">My task</h1>
        <ErrorState message="Couldn't load your tasks." onRetry={retry} />
      </section>
    )
  }

  return (
    <section className="my-task">
      <h1 className="sr-only">My task</h1>
      <div className="my-task__content">
        <TablesHeader />
        <div className="table__accordions">
          {STATUSES.map((status) => (
            <Accordion
              key={status}
              title={statusToLabel(status)}
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
