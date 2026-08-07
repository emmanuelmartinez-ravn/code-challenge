import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing/react'
import AddTaskForm from './AddTaskForm'
import { GET_USERS } from '@graphql/queries/users'
import { CREATE_TASK } from '@graphql/mutations/createTask'
import { getInitialDate } from '@constants/utils'

const mocks = [
  {
    request: { query: GET_USERS, variables: { input: {} } },
    result: { data: { users: [] } },
  },
]

function renderAddTaskForm() {
  return render(
    <MockedProvider mocks={mocks}>
      <AddTaskForm onClose={() => {}} />
    </MockedProvider>,
  )
}

describe('AddTaskForm', () => {
  it('shows the estimate options when the Estimate select is clicked', () => {
    renderAddTaskForm()

    fireEvent.click(screen.getByRole('button', { name: 'Estimate' }))

    expect(screen.getByText('1 Point')).toBeInTheDocument()
  })

  it('shows the tag options when the Label multiselect is clicked', () => {
    renderAddTaskForm()

    fireEvent.click(screen.getByRole('button', { name: 'Label' }))

    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('shows the date picker when the due date button is clicked', () => {
    renderAddTaskForm()

    fireEvent.click(screen.getByRole('button', { name: 'Due date' }))

    expect(
      screen.getByRole('button', { name: 'Next month' }),
    ).toBeInTheDocument()
  })

  it('calls createTask with the entered task details on submit', async () => {
    const today = getInitialDate()
    const mockUser = { id: 'user-1', fullName: 'Jane Doe', avatar: '' }

    const createTaskResult = vi.fn().mockReturnValue({
      data: {
        createTask: {
          __typename: 'Task',
          id: 'task-1',
          assignee: { __typename: 'User', ...mockUser },
          createdAt: new Date().toISOString(),
          creator: { __typename: 'User', ...mockUser },
          dueDate: new Date(
            today.year,
            today.month,
            today.day,
          ).toISOString(),
          name: 'Write onboarding docs',
          pointEstimate: 'ONE',
          position: 0,
          status: 'TODO',
          tags: [],
        },
      },
    })

    const { container } = render(
      <MockedProvider
        mocks={[
          {
            request: { query: GET_USERS, variables: { input: {} } },
            result: { data: { users: [mockUser] } },
          },
          {
            request: {
              query: CREATE_TASK,
              variables: {
                input: {
                  name: 'Write onboarding docs',
                  dueDate: new Date(today.year, today.month, today.day),
                  pointEstimate: 'ONE',
                  status: 'TODO',
                  tags: [],
                  assigneeId: 'user-1',
                },
              },
            },
            result: createTaskResult,
          },
        ]}
      >
        <AddTaskForm onClose={() => {}} />
      </MockedProvider>,
    )

    fireEvent.change(screen.getByPlaceholderText('Task title'), {
      target: { value: 'Write onboarding docs' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Estimate' }))
    fireEvent.click(screen.getByRole('button', { name: '1 Point' }))

    fireEvent.click(screen.getByRole('button', { name: 'Assignee' }))
    fireEvent.click(await screen.findByRole('button', { name: 'Jane Doe' }))

    fireEvent.click(screen.getByRole('button', { name: 'Due date' }))
    fireEvent.click(container.querySelector('.calendar-button.today')!)

    fireEvent.click(screen.getByRole('button', { name: 'Create' }))

    await waitFor(() => {
      expect(createTaskResult).toHaveBeenCalled()
    })
  })
})
