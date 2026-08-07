import Accordion from '@shared/components/Accordion/Accordion'
import './MyTaskPage.css'
import { useOutletContext } from 'react-router'
import TablesHeader from './TablesHeader'
import TaskTable from './TasksTable'
import { STATUSES } from '@constants/Status'
import type { ControlsOutletContext } from '@core/layout/ControlsLayout/ControlsLayout'

function MyTaskPage() {
  const { tasksByStatus } = useOutletContext<ControlsOutletContext>()

  return (
    <section className="my-task">
      <h1 className="sr-only">My task</h1>
      <div className="my-task__content">
        <TablesHeader />
        <div className="table__accordions">
          {STATUSES.map((status) => (
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
