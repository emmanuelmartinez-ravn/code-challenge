import { useState } from 'react'
import './AddTaskForm.css'
import Select from '@shared/components/Select/Select'
import PlusLessIcon from '@shared/icons/PlusLessIcon'
import EstimateSelectOption from './EstimateSelectOption'
import { POINT_ESTIMATES, type PointEstimate } from '@constants/PointEstimate'
import {
  formatDate,
  getInitialDate,
  pointEstimateToNumber,
} from '@constants/utils'
import AssigneeSelectOption from './AssigneeSelectOption'
import UserIcon from '@shared/icons/UserIcon'
import { useQuery, useMutation } from '@apollo/client/react'
import { GET_USERS } from '@graphql/queries/users'
import { GET_TASKS } from '@graphql/queries/task'
import Multiselect from '@shared/components/Multiselect/Multiselect'
import { TAGS, type Tag } from '@constants/Tag'
import TagIcon from '@shared/icons/TagIcon'
import DatePicker from '@shared/components/DatePicker/DatePicker'
import CalendarCheckIcon from '@shared/icons/CalendarCheckIcon'
import Button from '@shared/components/Buttons/Button/Button'
import { CREATE_TASK } from '@graphql/mutations/createTask'

function AddTaskForm({ onClose }: { readonly onClose: () => void }) {
  const { data } = useQuery(GET_USERS, {
    variables: {
      input: {},
    },
  })

  const [selectedEstimate, setSelectedEstimate] =
    useState<PointEstimate | null>(null)

  const [selectedAssignee, setSelectedAssignee] = useState<string | null>(null)

  const [selectedTags, setSelectedTags] = useState<Tag[]>([])

  const [openDatePicker, setOpenDatePicker] = useState(false)

  const [createTask] = useMutation(CREATE_TASK, {
    refetchQueries: [{ query: GET_TASKS, variables: { input: {} } }],
  })

  const [selectedDate, setSelectedDate] = useState<{
    year: number
    month: number
    day: number
  } | null>(null)

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const title = formData.get('title') as string

    if (!title || !selectedDate || !selectedEstimate || !selectedAssignee) {
      return
    }

    createTask({
      variables: {
        input: {
          name: title,
          dueDate: new Date(
            selectedDate.year,
            selectedDate.month,
            selectedDate.day,
          ),
          pointEstimate: selectedEstimate,
          status: 'TODO',
          tags: selectedTags,
          assigneeId: selectedAssignee,
        },
      },
    })

    onClose()
  }

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
          value={selectedEstimate}
          onChange={(value) => setSelectedEstimate(value as PointEstimate)}
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
          value={selectedAssignee}
          onChange={(value) => setSelectedAssignee(value)}
        />

        <Multiselect
          name="Label"
          title="Tag Title"
          icon={<TagIcon />}
          options={TAGS}
          values={selectedTags}
          onChange={(values) => setSelectedTags(values as Tag[])}
        />

        <div className="date-picker-wrapper">
          <button
            className="button open-date-picker-button body body--m"
            type="button"
            onClick={() => setOpenDatePicker(!openDatePicker)}
          >
            <CalendarCheckIcon />
            {selectedDate
              ? formatDate(
                  new Date(
                    selectedDate.year,
                    selectedDate.month,
                    selectedDate.day,
                  ),
                ).formatted
              : 'Due date'}
          </button>

          {openDatePicker && (
            <div className="date-picker-container">
              <DatePicker
                value={selectedDate ?? getInitialDate()}
                onChange={(value) => setSelectedDate(value)}
              />
            </div>
          )}
        </div>
      </div>

      <div className="add-task-form__footer">
        <Button variant="secondary" name="Cancel" onClick={onClose} />
        <Button variant="primary" name="Create" type="submit" />
      </div>
    </form>
  )
}

export default AddTaskForm
