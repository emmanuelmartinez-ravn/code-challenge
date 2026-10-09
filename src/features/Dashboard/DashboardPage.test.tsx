import { render, screen, act } from '@testing-library/react'
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

function RootOutletStub() {
  return <Outlet context={{ search: '' }} />
}

function renderDashboard(mocks: MockedProviderProps['mocks']) {
  const router = createMemoryRouter(
    [
      {
        element: <RootOutletStub />,
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

    expect(
      await screen.findByText('Write onboarding docs'),
    ).toBeInTheDocument()
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
