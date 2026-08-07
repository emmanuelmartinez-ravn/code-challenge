import { Outlet, useOutletContext } from 'react-router'
import { useQuery } from '@apollo/client/react'
import Controls from '@core/layout/ControlsLayout/Controls'
import { GET_TASKS } from '@graphql/queries/task'
import { groupTasksByStatus } from '@constants/utils'
import type { Status } from '@constants/Status'
import type { Task } from '@constants/Task'
import type { RootOutletContext } from '@core/layout/RootLayout'

export type ControlsOutletContext = {
  tasksByStatus: Map<Status, Task[]>
  loading: boolean
}

function ControlsLayout() {
  const { search } = useOutletContext<RootOutletContext>()

  const { data, loading } = useQuery(GET_TASKS, {
    variables: {
      input: {},
    },
  })

  const filteredTasks = data?.tasks.filter((task) =>
    task.name.toLowerCase().includes(search.toLowerCase()),
  )

  const tasksByStatus = groupTasksByStatus(filteredTasks)

  const outletContext: ControlsOutletContext = { tasksByStatus, loading }

  return (
    <>
      <Controls />
      <Outlet context={outletContext} />
    </>
  )
}

export default ControlsLayout
