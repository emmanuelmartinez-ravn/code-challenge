import './DashboardPage.css'
import { useOutletContext } from 'react-router'
import { STATUSES } from '@constants/Status'
import TasksColumn from './TasksColumn'
import NoResults from './NoResults'
import type { ControlsOutletContext } from '@core/layout/ControlsLayout/ControlsLayout'

function DashboardPage() {
  const { tasksByStatus, loading } = useOutletContext<ControlsOutletContext>()

  const hasResults = Array.from(tasksByStatus.values()).some(
    (tasks) => tasks.length > 0,
  )

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

      {!loading && !hasResults && <NoResults />}
    </section>
  )
}

export default DashboardPage
