import { Outlet } from 'react-router'
import { useQuery } from '@apollo/client/react'
import Controls from '@core/layout/ControlsLayout/Controls'
import { GET_TASKS } from '@graphql/queries/task'
import { groupTasksByStatus } from '@constants/utils'
import type { Status } from '@constants/Status'
import type { Task } from '@constants/Task'

export type ControlsOutletContext = {
  tasksByStatus: Map<Status, Task[]>
  loading: boolean
}

function ControlsLayout() {
  const { data, loading } = useQuery(GET_TASKS, {
    variables: {
      input: {},
    },
  })

  const tasksByStatus = groupTasksByStatus(data?.tasks)

  const outletContext: ControlsOutletContext = { tasksByStatus, loading }

  return (
    <>
      <Controls />
      <Outlet context={outletContext} />
    </>
  )
}

export default ControlsLayout
