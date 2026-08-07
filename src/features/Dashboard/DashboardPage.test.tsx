import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing/react'
import { createMemoryRouter, RouterProvider, Outlet } from 'react-router'
import DashboardPage from './DashboardPage'
import ControlsLayout from '@core/layout/ControlsLayout/ControlsLayout'
import { GET_TASKS } from '@graphql/queries/task'

function RootOutletStub() {
  return <Outlet context={{ search: '' }} />
}

describe('DashboardPage', () => {
  it('displays a card for a task returned by the API', async () => {
    const mocks = [
      {
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
      },
    ]

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

    render(
      <MockedProvider mocks={mocks}>
        <RouterProvider router={router} />
      </MockedProvider>,
    )

    expect(
      await screen.findByText('Write onboarding docs'),
    ).toBeInTheDocument()
  })
})
