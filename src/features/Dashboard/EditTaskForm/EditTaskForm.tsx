import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
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

type FormValues = {
  title: string
  pointEstimate: PointEstimate | null
  assigneeId: string | null
  status: Status
  tags: Tag[]
  dueDate: { year: number; month: number; day: number }
}

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

  const [openDatePicker, setOpenDatePicker] = useState(false)

  const [updateTask] = useMutation(UPDATE_TASK, {
    refetchQueries: [{ query: GET_TASKS, variables: { input: {} } }],
  })

  const { register, control, handleSubmit, formState } = useForm<FormValues>({
    defaultValues: {
      title: task.name,
      pointEstimate: task.pointEstimate,
      assigneeId: task.assignee?.id ?? null,
      status: task.status,
      tags: task.tags,
      dueDate: toDateParts(new Date(task.dueDate)),
    },
    reValidateMode: 'onSubmit',
  })

  const hasErrors = Object.keys(formState.errors).length > 0

  const onSubmit = ({
    title,
    pointEstimate,
    assigneeId,
    status,
    tags,
    dueDate,
  }: FormValues) => {
    if (!pointEstimate || !assigneeId) return

    updateTask({
      variables: {
        input: {
          id: task.id,
          name: title,
          dueDate: new Date(dueDate.year, dueDate.month, dueDate.day),
          pointEstimate,
          status,
          tags,
          assigneeId,
        },
      },
    })

    onClose()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="edit-task-form">
      <div className="edit-task-form__header">
        <label>
          <span className="sr-only">Task title</span>
          <input
            type="text"
            placeholder="Task title"
            className="body body--l body--bold"
            {...register('title', { required: true })}
          />
        </label>
      </div>

      <div className="edit-task-form__body">
        <Controller
          name="pointEstimate"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
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
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          name="assigneeId"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
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
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select
              name="Status"
              title="Status"
              options={STATUSES.map((status) => ({
                value: status,
                label: statusToLabel(status),
                node: <StatusSelectOption name={statusToLabel(status)} />,
              }))}
              icon={<PieIcon />}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <Multiselect
              name="Label"
              title="Tag Title"
              icon={<TagIcon />}
              options={TAGS.map((tag) => ({
                value: tag,
                label: tagToLabel(tag),
              }))}
              values={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          name="dueDate"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
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
                      field.value.year,
                      field.value.month,
                      field.value.day,
                    ),
                  ).formatted
                }
              </button>

              {openDatePicker && (
                <div className="date-picker-container">
                  <DatePicker value={field.value} onChange={field.onChange} />
                </div>
              )}
            </div>
          )}
        />
      </div>

      {hasErrors && (
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
