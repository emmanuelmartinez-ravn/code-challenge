import { render, screen, fireEvent } from '@testing-library/react'
import { createMemoryRouter, RouterProvider, Outlet } from 'react-router'
import Controls from './Controls'

function renderControls(initialPath: string) {
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

  return render(<RouterProvider router={router} />)
}

describe('Controls', () => {
  it('switches to the My task page when its button is clicked', async () => {
    renderControls('/dashboard')

    fireEvent.click(screen.getByRole('button', { name: 'My task' }))

    expect(await screen.findByText('My task page')).toBeInTheDocument()
  })
})
