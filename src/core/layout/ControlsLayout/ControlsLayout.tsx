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
  hasError: boolean
  retry: () => void
}

function ControlsLayout() {
  const { search } = useOutletContext<RootOutletContext>()

  const { data, previousData, loading, error, refetch } = useQuery(GET_TASKS, {
    variables: {
      input: search ? { name: search } : {},
    },
  })

  const tasks = data?.tasks ?? previousData?.tasks

  const tasksByStatus = groupTasksByStatus(tasks)

  const retry = () => {
    refetch().catch(() => {})
  }

  const outletContext: ControlsOutletContext = {
    tasksByStatus,
    loading: loading && !tasks,
    hasError: Boolean(error),
    retry,
  }

  return (
    <>
      <Controls />
      <Outlet context={outletContext} />
    </>
  )
}

export default ControlsLayout
