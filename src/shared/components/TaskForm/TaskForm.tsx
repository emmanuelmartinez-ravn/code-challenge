import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useQuery } from '@apollo/client/react'
import './TaskForm.css'
import Select from '@shared/components/Select/Select'
import Multiselect from '@shared/components/Multiselect/Multiselect'
import DatePicker from '@shared/components/DatePicker/DatePicker'
import Button from '@shared/components/Buttons/Button/Button'
import ErrorState from '@shared/components/ErrorState/ErrorState'
import PlusLessIcon from '@shared/icons/PlusLessIcon'
import UserIcon from '@shared/icons/UserIcon'
import PieIcon from '@shared/icons/PieIcon'
import TagIcon from '@shared/icons/TagIcon'
import CalendarCheckIcon from '@shared/icons/CalendarCheckIcon'
import EstimateSelectOption from './EstimateSelectOption'
import AssigneeSelectOption from './AssigneeSelectOption'
import StatusSelectOption from './StatusSelectOption'
import { GET_USERS } from '@graphql/queries/users'
import { POINT_ESTIMATES, type PointEstimate } from '@constants/PointEstimate'
import { STATUSES, type Status } from '@constants/Status'
import { TAGS, type Tag } from '@constants/Tag'
import type { Task } from '@constants/Task'
import {
  formatDate,
  getInitialDate,
  pointEstimateToLabel,
  statusToLabel,
  tagToLabel,
  toDateParts,
} from '@constants/utils'

export type TaskFormValues = {
  name: string
  pointEstimate: PointEstimate
  assigneeId: string
  status: Status
  tags: Tag[]
  dueDate: Date
}

type FormFields = {
  title: string
  pointEstimate: PointEstimate | null
  assigneeId: string | null
  status: Status
  tags: Tag[]
  dueDate: { year: number; month: number; day: number } | null
}

function TaskForm({
  initialTask,
  submitLabel,
  onSubmit,
  onCancel,
}: {
  readonly initialTask?: Task
  readonly submitLabel: string
  readonly onSubmit: (values: TaskFormValues) => Promise<void>
  readonly onCancel: () => void
}) {
  const { data, error, refetch } = useQuery(GET_USERS, {
    variables: {
      input: {},
    },
  })

  const retryUsers = () => {
    refetch().catch(() => {})
  }

  const [openDatePicker, setOpenDatePicker] = useState(false)

  const { register, control, handleSubmit, formState } = useForm<FormFields>({
    defaultValues: {
      title: initialTask?.name ?? '',
      pointEstimate: initialTask?.pointEstimate ?? null,
      assigneeId: initialTask?.assignee?.id ?? null,
      status: initialTask?.status ?? 'TODO',
      tags: initialTask?.tags ?? [],
      dueDate: initialTask ? toDateParts(new Date(initialTask.dueDate)) : null,
    },
    reValidateMode: 'onSubmit',
  })

  const hasErrors = Object.keys(formState.errors).length > 0

  const submitValidFields = async ({
    title,
    pointEstimate,
    assigneeId,
    status,
    tags,
    dueDate,
  }: FormFields) => {
    if (!pointEstimate || !assigneeId || !dueDate) return

    await onSubmit({
      name: title,
      pointEstimate,
      assigneeId,
      status,
      tags,
      dueDate: new Date(dueDate.year, dueDate.month, dueDate.day),
    })
  }

  return (
    <form onSubmit={handleSubmit(submitValidFields)} className="task-form">
      <div className="task-form__header">
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

      <div className="task-form__body">
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
                label: pointEstimateToLabel(estimate),
                node: (
                  <EstimateSelectOption name={pointEstimateToLabel(estimate)} />
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

        {initialTask && (
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
        )}

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
                {field.value
                  ? formatDate(
                      new Date(
                        field.value.year,
                        field.value.month,
                        field.value.day,
                      ),
                    ).formatted
                  : 'Due date'}
              </button>

              {openDatePicker && (
                <div className="date-picker-container">
                  <DatePicker
                    value={field.value ?? getInitialDate()}
                    onChange={field.onChange}
                  />
                </div>
              )}
            </div>
          )}
        />
      </div>

      {error && (
        <ErrorState
          title="Couldn't load the assignees."
          message="The assignee list can't be shown right now. Try again in a moment."
          onRetry={retryUsers}
        />
      )}

      {hasErrors && (
        <span role="alert" className="task-form__error body body--s">
          Please fill in the title, estimate, assignee, and due date.
        </span>
      )}

      <div className="task-form__footer">
        <Button variant="secondary" name="Cancel" onClick={onCancel} />
        <Button
          variant="primary"
          name={submitLabel}
          type="submit"
          disabled={formState.isSubmitting}
        />
      </div>
    </form>
  )
}

export default TaskForm
