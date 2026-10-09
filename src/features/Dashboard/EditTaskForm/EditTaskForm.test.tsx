import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing/react'
import EditTaskForm from './EditTaskForm'
import { GET_USERS } from '@graphql/queries/users'
import { GET_TASKS } from '@graphql/queries/task'
import { UPDATE_TASK } from '@graphql/mutations/updateTask'
import type { Task } from '@constants/Task'

const mockUser = { id: 'user-1', fullName: 'Jane Doe', avatar: '' }

const task: Task = {
  id: 'task-1',
  assignee: mockUser,
  createdAt: new Date(2026, 9, 1).toISOString(),
  creator: mockUser,
  dueDate: new Date(2026, 9, 15).toISOString(),
  name: 'Write onboarding docs',
  pointEstimate: 'TWO',
  position: 0,
  status: 'IN_PROGRESS',
  tags: ['REACT'],
}

function renderEditTaskForm(
  updateTaskResult: () => ReturnType<typeof updateTaskResponse>,
) {
  return render(
    <MockedProvider
      mocks={[
        {
          request: { query: GET_USERS, variables: { input: {} } },
          result: { data: { users: [mockUser] } },
        },
        {
          request: {
            query: UPDATE_TASK,
            variables: {
              input: {
                id: 'task-1',
                name: 'Write onboarding docs',
                dueDate: new Date(2026, 9, 15),
                pointEstimate: 'TWO',
                status: 'IN_PROGRESS',
                tags: ['REACT'],
                assigneeId: 'user-1',
              },
            },
          },
          result: updateTaskResult,
        },
        {
          request: { query: GET_TASKS, variables: { input: {} } },
          result: { data: { tasks: [] } },
        },
      ]}
    >
      <EditTaskForm task={task} onClose={() => {}} />
    </MockedProvider>,
  )
}

function updateTaskResponse() {
  return {
    data: {
      updateTask: {
        __typename: 'Task',
        ...task,
        assignee: { __typename: 'User', ...mockUser },
        creator: { __typename: 'User', ...mockUser },
      },
    },
  }
}

describe('EditTaskForm', () => {
  it('calls updateTask with the task details on submit', async () => {
    const updateTaskResult = vi.fn().mockReturnValue(updateTaskResponse())
    renderEditTaskForm(updateTaskResult)

    fireEvent.click(screen.getByRole('button', { name: 'Update' }))

    await waitFor(() => {
      expect(updateTaskResult).toHaveBeenCalled()
    })
  })

  it('shows the error alert when the title is cleared', async () => {
    renderEditTaskForm(vi.fn().mockReturnValue(updateTaskResponse()))

    fireEvent.change(screen.getByPlaceholderText('Task title'), {
      target: { value: '' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Update' }))

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Please fill in the title, estimate, assignee, and due date.',
    )
  })

  it('does not call updateTask when the title is cleared', async () => {
    const updateTaskResult = vi.fn().mockReturnValue(updateTaskResponse())
    renderEditTaskForm(updateTaskResult)

    fireEvent.change(screen.getByPlaceholderText('Task title'), {
      target: { value: '' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Update' }))
    await screen.findByRole('alert')

    expect(updateTaskResult).not.toHaveBeenCalled()
  })
})
