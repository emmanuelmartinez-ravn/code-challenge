import { Outlet, useOutletContext } from 'react-router'
import { useQuery } from '@apollo/client/react'
import Controls from '@core/layout/ControlsLayout/Controls'
import ErrorState from '@shared/components/ErrorState/ErrorState'
import { GET_TASKS } from '@graphql/queries/task'
import { groupTasksByStatus } from '@constants/utils'
import type { Status } from '@constants/Status'
import type { Task } from '@constants/Task'
import type { RootOutletContext } from '@core/layout/RootLayout'

export type ControlsOutletContext = {
  tasksByStatus: Map<Status, Task[]>
  loading: boolean
  isSearching: boolean
}

function ControlsLayout() {
  const { search } = useOutletContext<RootOutletContext>()

  const { data, previousData, loading, error, refetch } = useQuery(GET_TASKS, {
    variables: {
      input: search ? { name: search } : {},
    },
  })

  const retry = () => {
    refetch().catch(() => {})
  }

  if (error) {
    return (
      <>
        <Controls />
        <ErrorState
          title="Couldn't load your tasks."
          message="The task service isn't responding right now, so your task cards can't be shown. Please try again later."
          onRetry={retry}
        />
      </>
    )
  }

  const tasks = data?.tasks ?? previousData?.tasks

  const outletContext: ControlsOutletContext = {
    tasksByStatus: groupTasksByStatus(tasks),
    loading: loading && !tasks,
    isSearching: search.length > 0,
  }

  return (
    <>
      <Controls />
      <Outlet context={outletContext} />
    </>
  )
}

export default ControlsLayout
