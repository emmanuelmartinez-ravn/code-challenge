import type { SubmitEvent } from 'react'
import './AddTaskForm.css'
import Select from '@shared/components/Select/Select'
import PlusLessIcon from '@shared/icons/PlusLessIcon'
import EstimateSelectOption from './EstimateSelectOption'
import { PointEstimates } from '@constants/PointEstimate'
import { pointEstimateToNumber } from '@constants/utils'
import AssigneeSelectOption from './AssigneeSelectOption'
import UserIcon from '@shared/icons/UserIcon'
import { useQuery } from '@apollo/client/react'
import { GET_USERS } from '@graphql/queries/users'

function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
  event.preventDefault()
}

function AddTaskForm() {
  const { data } = useQuery(GET_USERS, {
    variables: {
      input: {},
    },
  })

  return (
    <form onSubmit={(event) => handleSubmit(event)} className="add-task-form">
      <div className="add-task-form__header">
        <label>
          <span className="sr-only">Task title</span>
          <input
            type="text"
            name="title"
            placeholder="Task title"
            className="body body--l body--bold"
          />
        </label>
      </div>

      <div className="add-task-form__body">
        <Select
          name="Estimate"
          title="Estimate"
          options={PointEstimates.map((estimate) => ({
            value: estimate,
            label: `${pointEstimateToNumber(estimate)} ${pointEstimateToNumber(estimate) === 1 ? 'Point' : 'Points'}`,
            node: (
              <EstimateSelectOption
                name={`${pointEstimateToNumber(estimate)} ${pointEstimateToNumber(estimate) === 1 ? 'Point' : 'Points'}`}
              />
            ),
          }))}
          icon={<PlusLessIcon />}
        />

        <Select
          name="Assignee"
          title="Assignee"
          options={
            data
              ? data.users.map((user) => ({
                  value: user.id,
                  label: user.fullName,
                  node: <AssigneeSelectOption name={user.fullName} />,
                }))
              : []
          }
          icon={<UserIcon />}
        />
      </div>

      <div className="add-task-form__footer">
        <button type="submit">Add task</button>
      </div>
    </form>
  )
}

export default AddTaskForm
