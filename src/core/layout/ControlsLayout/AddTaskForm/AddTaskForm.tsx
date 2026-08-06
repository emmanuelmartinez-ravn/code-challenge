import type { SubmitEvent } from 'react'
import './AddTaskForm.css'
import Select from '@shared/components/Select/Select'
import PlusLessIcon from '@shared/icons/PlusLessIcon'
import EstimateSelectOption from './EstimateSelectOption'
import { POINT_ESTIMATES } from '@constants/PointEstimate'
import { pointEstimateToNumber } from '@constants/utils'
import AssigneeSelectOption from './AssigneeSelectOption'
import UserIcon from '@shared/icons/UserIcon'
import { useQuery } from '@apollo/client/react'
import { GET_USERS } from '@graphql/queries/users'
import Multiselect from '@shared/components/Multiselect/Multiselect'
import { TAGS } from '@constants/Tag'
import TagIcon from '@shared/icons/TagIcon'

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
          options={POINT_ESTIMATES.map((estimate) => ({
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
          title="Assign To..."
          options={
            data
              ? data.users.map((user) => ({
                  value: user.id,
                  label: user.fullName,
                  node: (
                    <AssigneeSelectOption
                      name={user.fullName}
                      src={user.avatar}
                    />
                  ),
                }))
              : []
          }
          icon={<UserIcon />}
        />

        <Multiselect
          name="Label"
          title="Tag Title"
          icon={<TagIcon />}
          options={TAGS.map((tag) => ({
            value: tag,
            label: tag,
          }))}
        />
      </div>

      <div className="add-task-form__footer">
        <button type="submit">Add task</button>
      </div>
    </form>
  )
}

export default AddTaskForm
