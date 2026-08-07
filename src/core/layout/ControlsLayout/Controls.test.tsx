import { render, screen, fireEvent } from '@testing-library/react'
import {
  MockedProvider,
  type MockedProviderProps,
} from '@apollo/client/testing/react'
import { createMemoryRouter, RouterProvider, Outlet } from 'react-router'
import Controls from './Controls'
import { GET_USERS } from '@graphql/queries/users'

function renderControls(
  initialPath: string,
  mocks: MockedProviderProps['mocks'] = [],
) {
  const router = createMemoryRouter(
    [
      {
        element: (
          <>
            <Controls />
            <Outlet />
          </>
        ),
        children: [
          { path: 'dashboard', element: <p>Dashboard page</p> },
          { path: 'my-task', element: <p>My task page</p> },
        ],
      },
    ],
    { initialEntries: [initialPath] },
  )

  return render(
    <MockedProvider mocks={mocks}>
      <RouterProvider router={router} />
    </MockedProvider>,
  )
}

describe('Controls', () => {
  it('switches to the My task page when its button is clicked', async () => {
    renderControls('/dashboard')

    fireEvent.click(screen.getByRole('button', { name: 'My task' }))

    expect(await screen.findByText('My task page')).toBeInTheDocument()
  })

  it('shows the add task modal when the Add task button is clicked', () => {
    renderControls('/dashboard', [
      {
        request: { query: GET_USERS, variables: { input: {} } },
        result: { data: { users: [] } },
      },
    ])

    fireEvent.click(screen.getByRole('button', { name: 'Add task' }))

    expect(screen.getByPlaceholderText('Task title')).toBeInTheDocument()
  })
})
