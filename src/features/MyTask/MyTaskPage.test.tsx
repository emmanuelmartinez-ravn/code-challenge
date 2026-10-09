import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing/react'
import { createMemoryRouter, RouterProvider, Outlet } from 'react-router'
import MyTaskPage from './MyTaskPage'
import ControlsLayout from '@core/layout/ControlsLayout/ControlsLayout'
import { GET_TASKS } from '@graphql/queries/task'

function RootOutletStub() {
  return <Outlet context={{ search: '' }} />
}

describe('MyTaskPage', () => {
  it('shows an error state when the tasks fail to load', async () => {
    const router = createMemoryRouter(
      [
        {
          element: <RootOutletStub />,
          children: [
            {
              element: <ControlsLayout />,
              children: [{ path: '/', element: <MyTaskPage /> }],
            },
          ],
        },
      ],
      { initialEntries: ['/'] },
    )

    render(
      <MockedProvider
        mocks={[
          {
            request: { query: GET_TASKS, variables: { input: {} } },
            error: new Error('Network down'),
          },
        ]}
      >
        <RouterProvider router={router} />
      </MockedProvider>,
    )

    expect(
      await screen.findByText("Couldn't load your tasks."),
    ).toBeInTheDocument()
  })
})
