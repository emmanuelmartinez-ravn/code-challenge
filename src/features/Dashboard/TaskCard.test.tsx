import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing/react'
import TaskCard from './TaskCard'
import { DELETE_TASK } from '@graphql/mutations/deleteTask'
import { GET_TASKS } from '@graphql/queries/task'
import type { Task } from '@constants/Task'

const mockTask: Task = {
  id: 'task-1',
  assignee: null,
  createdAt: new Date('2024-01-01T00:00:00.000Z'),
  creator: { id: 'user-1', avatar: '', fullName: 'Jane Doe' },
  dueDate: new Date('2024-01-10T00:00:00.000Z'),
  name: 'Write onboarding docs',
  pointEstimate: 'ONE',
  position: 0,
  status: 'TODO',
  tags: [],
}

describe('TaskCard', () => {
  it('calls deleteTask when the Delete option is clicked', async () => {
    const deleteTaskResult = vi.fn().mockReturnValue({
      data: { deleteTask: { __typename: 'Task', id: mockTask.id } },
    })

    render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: DELETE_TASK,
              variables: { input: { id: mockTask.id } },
            },
            result: deleteTaskResult,
          },
          {
            request: { query: GET_TASKS, variables: { input: {} } },
            result: { data: { tasks: [] } },
          },
        ]}
      >
        <TaskCard task={mockTask} />
      </MockedProvider>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'More options' }))
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }))

    await waitFor(() => {
      expect(deleteTaskResult).toHaveBeenCalled()
    })
  })
})
