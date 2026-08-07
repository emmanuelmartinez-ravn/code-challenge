import { render, screen, fireEvent } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing/react'
import AddTaskForm from './AddTaskForm'
import { GET_USERS } from '@graphql/queries/users'

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
})
