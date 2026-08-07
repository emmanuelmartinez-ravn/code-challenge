import { useState } from 'react'
import './EditTaskForm.css'
import Select from '@shared/components/Select/Select'
import PlusLessIcon from '@shared/icons/PlusLessIcon'
import EstimateSelectOption from '@core/layout/ControlsLayout/AddTaskForm/EstimateSelectOption'
import { POINT_ESTIMATES, type PointEstimate } from '@constants/PointEstimate'
import {
  formatDate,
  toDateParts,
  pointEstimateToNumber,
  statusToLabel,
  tagToLabel,
} from '@constants/utils'
import AssigneeSelectOption from '@core/layout/ControlsLayout/AddTaskForm/AssigneeSelectOption'
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
import { UPDATE_TASK } from '@graphql/mutations/updateTask'
import type { Task } from '@constants/Task'
import { STATUSES, type Status } from '@constants/Status'
import PieIcon from '@shared/icons/PieIcon'
import StatusSelectOption from './StatusSelectOption'

function EditTaskForm({
  task,
  onClose,
}: {
  readonly task: Task
  readonly onClose: () => void
}) {
  const { data } = useQuery(GET_USERS, {
    variables: {
      input: {},
    },
  })

  const [selectedEstimate, setSelectedEstimate] =
    useState<PointEstimate | null>(task.pointEstimate)

  const [selectedAssignee, setSelectedAssignee] = useState<string | null>(
    task.assignee?.id ?? null,
  )

  const [selectedTags, setSelectedTags] = useState<Tag[]>(task.tags)

  const [selectedStatus, setSelectedStatus] = useState<Status>(task.status)

  const [openDatePicker, setOpenDatePicker] = useState(false)

  const [updateTask] = useMutation(UPDATE_TASK, {
    refetchQueries: [{ query: GET_TASKS, variables: { input: {} } }],
  })

  const [selectedDate, setSelectedDate] = useState(
    toDateParts(new Date(task.dueDate)),
  )

  const [showError, setShowError] = useState(false)

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const title = formData.get('title') as string

    if (!title || !selectedDate || !selectedEstimate || !selectedAssignee) {
      setShowError(true)
      return
    }

    setShowError(false)

    updateTask({
      variables: {
        input: {
          id: task.id,
          name: title,
          dueDate: new Date(
            selectedDate.year,
            selectedDate.month,
            selectedDate.day,
          ),
          pointEstimate: selectedEstimate,
          status: selectedStatus,
          tags: selectedTags,
          assigneeId: selectedAssignee,
        },
      },
    })

    onClose()
  }

  return (
    <form onSubmit={(event) => handleSubmit(event)} className="edit-task-form">
      <div className="edit-task-form__header">
        <label>
          <span className="sr-only">Task title</span>
          <input
            type="text"
            name="title"
            defaultValue={task.name}
            placeholder="Task title"
            className="body body--l body--bold"
          />
        </label>
      </div>

      <div className="edit-task-form__body">
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

        <Select
          name="Status"
          title="Status"
          options={STATUSES.map((status) => ({
            value: status,
            label: statusToLabel(status),
            node: <StatusSelectOption name={statusToLabel(status)} />,
          }))}
          icon={<PieIcon />}
          value={selectedStatus}
          onChange={(value) => setSelectedStatus(value as Status)}
        />

        <Multiselect
          name="Label"
          title="Tag Title"
          icon={<TagIcon />}
          options={TAGS.map((tag) => ({ value: tag, label: tagToLabel(tag) }))}
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
            {
              formatDate(
                new Date(
                  selectedDate.year,
                  selectedDate.month,
                  selectedDate.day,
                ),
              ).formatted
            }
          </button>

          {openDatePicker && (
            <div className="date-picker-container">
              <DatePicker
                value={selectedDate}
                onChange={(value) => setSelectedDate(value)}
              />
            </div>
          )}
        </div>
      </div>

      {showError && (
        <span role="alert" className="edit-task-form__error body body--s">
          Please fill in the title, estimate, assignee, and due date.
        </span>
      )}

      <div className="edit-task-form__footer">
        <Button variant="secondary" name="Cancel" onClick={onClose} />
        <Button variant="primary" name="Update" type="submit" />
      </div>
    </form>
  )
}

export default EditTaskForm
