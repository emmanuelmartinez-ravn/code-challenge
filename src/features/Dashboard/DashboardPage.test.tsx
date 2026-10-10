import { render, screen, act, fireEvent } from '@testing-library/react'
import {
  MockedProvider,
  type MockedProviderProps,
} from '@apollo/client/testing/react'
import { createMemoryRouter, RouterProvider, Outlet } from 'react-router'
import type { DragDropContextProps, DropResult } from '@hello-pangea/dnd'
import DashboardPage from './DashboardPage'
import ControlsLayout from '@core/layout/ControlsLayout/ControlsLayout'
import { GET_TASKS } from '@graphql/queries/task'
import { UPDATE_TASK } from '@graphql/mutations/updateTask'
import ToastProvider from '@shared/components/Toast/ToastProvider'

const dragDrop = vi.hoisted(() => {
  const state: { onDragEnd: DragDropContextProps['onDragEnd'] | null } = {
    onDragEnd: null,
  }
  return state
})

vi.mock('@hello-pangea/dnd', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@hello-pangea/dnd')>()

  return {
    ...actual,
    DragDropContext: (props: DragDropContextProps) => {
      dragDrop.onDragEnd = props.onDragEnd
      return <actual.DragDropContext {...props} />
    },
  }
})

const getTasksMock = {
  request: { query: GET_TASKS, variables: { input: {} } },
  result: {
    data: {
      tasks: [
        {
          __typename: 'Task',
          id: 'task-1',
          assignee: {
            __typename: 'User',
            id: 'user-1',
            avatar: '',
            fullName: 'Jane Doe',
          },
          createdAt: '2024-01-01T00:00:00.000Z',
          creator: {
            __typename: 'User',
            id: 'user-1',
            avatar: '',
            fullName: 'Jane Doe',
          },
          dueDate: '2024-01-10T00:00:00.000Z',
          name: 'Write onboarding docs',
          pointEstimate: 'TWO',
          position: 0,
          status: 'TODO',
          tags: ['REACT'],
        },
      ],
    },
  },
}

function RootOutletStub({ search }: { readonly search: string }) {
  return <Outlet context={{ search }} />
}

function renderDashboard(mocks: MockedProviderProps['mocks'], search = '') {
  const router = createMemoryRouter(
    [
      {
        element: <RootOutletStub search={search} />,
        children: [
          {
            element: <ControlsLayout />,
            children: [{ path: '/', element: <DashboardPage /> }],
          },
        ],
      },
    ],
    { initialEntries: ['/'] },
  )

  return render(
    <MockedProvider mocks={mocks}>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </MockedProvider>,
  )
}

const moveToInProgress: DropResult = {
  draggableId: 'task-1',
  type: 'DEFAULT',
  mode: 'FLUID',
  reason: 'DROP',
  source: { droppableId: 'TODO', index: 0 },
  destination: { droppableId: 'IN_PROGRESS', index: 0 },
  combine: null,
}

describe('DashboardPage', () => {
  it('displays a card for a task returned by the API', async () => {
    renderDashboard([getTasksMock])

    expect(await screen.findByText('Write onboarding docs')).toBeInTheDocument()
  })

  it('shows an error toast when moving a task fails', async () => {
    renderDashboard([
      getTasksMock,
      {
        request: { query: UPDATE_TASK, variables: () => true },
        error: new Error('Network down'),
      },
    ])
    await screen.findByText('Write onboarding docs')

    act(() => {
      dragDrop.onDragEnd?.(moveToInProgress, { announce: () => {} })
    })

    expect(
      await screen.findByText("Couldn't move the task. Please try again."),
    ).toBeInTheDocument()
  })
})

describe('DashboardPage task loading', () => {
  const getTasksFailure = {
    request: { query: GET_TASKS, variables: { input: {} } },
    error: new Error('Network down'),
  }

  it('sends the search term to the server as the name filter', async () => {
    renderDashboard(
      [
        {
          request: {
            query: GET_TASKS,
            variables: { input: { name: 'onboarding' } },
          },
          result: getTasksMock.result,
        },
      ],
      'onboarding',
    )

    expect(await screen.findByText('Write onboarding docs')).toBeInTheDocument()
  })

  it('shows an error state when the tasks fail to load', async () => {
    renderDashboard([getTasksFailure])

    expect(
      await screen.findByText("Couldn't load your tasks."),
    ).toBeInTheDocument()
  })

  it('does not claim there are no results when the tasks fail to load', async () => {
    renderDashboard([getTasksFailure])
    await screen.findByText("Couldn't load your tasks.")

    expect(
      screen.queryByText('No tasks match your search.'),
    ).not.toBeInTheDocument()
  })

  it('loads the tasks again when Retry is clicked', async () => {
    renderDashboard([getTasksFailure, getTasksMock])
    await screen.findByText("Couldn't load your tasks.")

    fireEvent.click(screen.getByRole('button', { name: 'Retry' }))

    expect(await screen.findByText('Write onboarding docs')).toBeInTheDocument()
  })
})

describe('DashboardPage columns', () => {
  it('shows the status columns in workflow order', async () => {
    renderDashboard([getTasksMock])
    await screen.findByText('Write onboarding docs')

    const columnTitles = screen
      .getAllByRole('heading', { level: 2 })
      .map((heading) => heading.textContent?.replace(/\s*\(\d+\)$/, ''))

    expect(columnTitles).toEqual([
      'Backlog',
      'To do',
      'In Progress',
      'Done',
      'Cancelled',
    ])
  })
})

describe('DashboardPage messages', () => {
  const noTasks = { data: { tasks: [] } }

  const loadFailure = {
    request: { query: GET_TASKS, variables: { input: {} } },
    error: new Error('Network down'),
  }

  it('explains that the task cards cannot be shown when loading fails', async () => {
    renderDashboard([loadFailure])

    expect(
      await screen.findByText(
        "Your task cards can't be shown right now. Try again in a moment.",
      ),
    ).toBeInTheDocument()
  })

  it('keeps a page heading when loading fails', async () => {
    renderDashboard([loadFailure])
    await screen.findByText("Couldn't load your tasks.")

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('keeps the Add task button visible when loading fails', async () => {
    renderDashboard([loadFailure])
    await screen.findByText("Couldn't load your tasks.")

    expect(screen.getByRole('button', { name: /Add task/ })).toBeInTheDocument()
  })

  it('says there are no tasks yet when the board is empty without a search', async () => {
    renderDashboard([
      {
        request: { query: GET_TASKS, variables: { input: {} } },
        result: noTasks,
      },
    ])

    expect(
      await screen.findByText('There are no tasks yet.'),
    ).toBeInTheDocument()
  })

  it('says nothing matches when a search returns no tasks', async () => {
    renderDashboard(
      [
        {
          request: {
            query: GET_TASKS,
            variables: { input: { name: 'missing' } },
          },
          result: noTasks,
        },
      ],
      'missing',
    )

    expect(
      await screen.findByText('No tasks match your search.'),
    ).toBeInTheDocument()
  })
})
