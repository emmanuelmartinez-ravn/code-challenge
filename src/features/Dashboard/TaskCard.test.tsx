import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react'
import {
  MockedProvider,
  type MockedProviderProps,
} from '@apollo/client/testing/react'
import TaskCard from './TaskCard'
import { DELETE_TASK } from '@graphql/mutations/deleteTask'
import { GET_TASKS } from '@graphql/queries/task'
import type { Task } from '@constants/Task'
import ToastProvider from '@shared/components/Toast/ToastProvider'

const mockTask: Task = {
  id: 'task-1',
  assignee: null,
  createdAt: '2024-01-01T00:00:00.000Z',
  creator: { id: 'user-1', avatar: '', fullName: 'Jane Doe' },
  dueDate: '2024-01-10T00:00:00.000Z',
  name: 'Write onboarding docs',
  pointEstimate: 'ONE',
  position: 0,
  status: 'TODO',
  tags: [],
}

function deleteTaskSuccess(result = vi.fn()) {
  result.mockReturnValue({
    data: { deleteTask: { __typename: 'Task', id: mockTask.id } },
  })

  return {
    request: {
      query: DELETE_TASK,
      variables: { input: { id: mockTask.id } },
    },
    result,
  }
}

const deleteTaskFailure = {
  request: {
    query: DELETE_TASK,
    variables: { input: { id: mockTask.id } },
  },
  error: new Error('Network down'),
}

function renderTaskCard(mocks: MockedProviderProps['mocks']) {
  return render(
    <MockedProvider
      mocks={[
        ...(mocks ?? []),
        {
          request: { query: GET_TASKS, variables: { input: {} } },
          result: { data: { tasks: [] } },
        },
      ]}
    >
      <ToastProvider>
        <TaskCard task={mockTask} />
      </ToastProvider>
    </MockedProvider>,
  )
}

function openDeleteDialog() {
  fireEvent.click(screen.getByRole('button', { name: 'More options' }))
  fireEvent.click(screen.getByRole('button', { name: 'Delete' }))

  return screen.getByRole('dialog', { name: 'Delete task?' })
}

describe('TaskCard', () => {
  it('asks for confirmation before deleting', () => {
    const deleteTaskResult = vi.fn()
    renderTaskCard([deleteTaskSuccess(deleteTaskResult)])

    openDeleteDialog()

    expect(deleteTaskResult).not.toHaveBeenCalled()
  })

  it('calls deleteTask when the deletion is confirmed', async () => {
    const deleteTaskResult = vi.fn()
    renderTaskCard([deleteTaskSuccess(deleteTaskResult)])

    const dialog = openDeleteDialog()
    fireEvent.click(within(dialog).getByRole('button', { name: 'Delete' }))

    await waitFor(() => {
      expect(deleteTaskResult).toHaveBeenCalled()
    })
  })

  it('does not call deleteTask when the deletion is cancelled', async () => {
    const deleteTaskResult = vi.fn()
    renderTaskCard([deleteTaskSuccess(deleteTaskResult)])

    const dialog = openDeleteDialog()
    fireEvent.click(within(dialog).getByRole('button', { name: 'Cancel' }))

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
    expect(deleteTaskResult).not.toHaveBeenCalled()
  })

  it('shows a success toast after the task is deleted', async () => {
    renderTaskCard([deleteTaskSuccess()])

    const dialog = openDeleteDialog()
    fireEvent.click(within(dialog).getByRole('button', { name: 'Delete' }))

    expect(await screen.findByText('Task deleted.')).toBeInTheDocument()
  })

  it('shows an error toast when deleting fails', async () => {
    renderTaskCard([deleteTaskFailure])

    const dialog = openDeleteDialog()
    fireEvent.click(within(dialog).getByRole('button', { name: 'Delete' }))

    expect(
      await screen.findByText("Couldn't delete the task. Please try again."),
    ).toBeInTheDocument()
  })

  it('keeps the dialog open when deleting fails', async () => {
    renderTaskCard([deleteTaskFailure])

    const dialog = openDeleteDialog()
    fireEvent.click(within(dialog).getByRole('button', { name: 'Delete' }))
    await screen.findByText("Couldn't delete the task. Please try again.")

    expect(
      screen.getByRole('dialog', { name: 'Delete task?' }),
    ).toBeInTheDocument()
  })

  it('returns focus to More options when the dialog closes', async () => {
    renderTaskCard([deleteTaskSuccess()])

    openDeleteDialog()
    fireEvent.keyDown(document, { key: 'Escape' })

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'More options' })).toHaveFocus()
    })
  })
})
