import { render, screen, fireEvent } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing/react'
import TaskForm from './TaskForm'
import { GET_USERS } from '@graphql/queries/users'

const usersFailure = {
  request: { query: GET_USERS, variables: { input: {} } },
  error: new Error('Network down'),
}

const usersSuccess = {
  request: { query: GET_USERS, variables: { input: {} } },
  result: {
    data: {
      users: [
        {
          id: '1',
          fullName: 'Ada Lovelace',
          avatar: 'https://example.com/avatar.png',
        },
      ],
    },
  },
}

function renderTaskForm(
  mocks: ReadonlyArray<typeof usersFailure | typeof usersSuccess>,
) {
  return render(
    <MockedProvider mocks={mocks}>
      <TaskForm
        submitLabel="Create"
        onSubmit={async () => {}}
        onCancel={() => {}}
      />
    </MockedProvider>,
  )
}

describe('TaskForm assignees', () => {
  it('shows an error state when the assignees fail to load', async () => {
    renderTaskForm([usersFailure])

    expect(await screen.findByRole('alert')).toHaveTextContent(
      "Couldn't load the assignees.",
    )
  })

  it('reloads the assignees when Retry is clicked', async () => {
    renderTaskForm([usersFailure, usersSuccess])

    fireEvent.click(await screen.findByRole('button', { name: 'Retry' }))
    fireEvent.click(await screen.findByRole('button', { name: 'Assignee' }))

    expect(await screen.findByText('Ada Lovelace')).toBeInTheDocument()
  })
})
