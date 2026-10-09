import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import './AddTaskForm.css'
import Select from '@shared/components/Select/Select'
import PlusLessIcon from '@shared/icons/PlusLessIcon'
import EstimateSelectOption from './EstimateSelectOption'
import { POINT_ESTIMATES, type PointEstimate } from '@constants/PointEstimate'
import {
  formatDate,
  getInitialDate,
  pointEstimateToNumber,
  tagToLabel,
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

type FormValues = {
  title: string
  pointEstimate: PointEstimate | null
  assigneeId: string | null
  tags: Tag[]
  dueDate: { year: number; month: number; day: number } | null
}

function AddTaskForm({ onClose }: { readonly onClose: () => void }) {
  const { data } = useQuery(GET_USERS, {
    variables: {
      input: {},
    },
  })

  const [openDatePicker, setOpenDatePicker] = useState(false)

  const [createTask] = useMutation(CREATE_TASK, {
    refetchQueries: [{ query: GET_TASKS, variables: { input: {} } }],
  })

  const { register, control, handleSubmit, formState } = useForm<FormValues>({
    defaultValues: {
      title: '',
      pointEstimate: null,
      assigneeId: null,
      tags: [],
      dueDate: null,
    },
    reValidateMode: 'onSubmit',
  })

  const hasErrors = Object.keys(formState.errors).length > 0

  const onSubmit = ({
    title,
    pointEstimate,
    assigneeId,
    tags,
    dueDate,
  }: FormValues) => {
    if (!pointEstimate || !assigneeId || !dueDate) return

    createTask({
      variables: {
        input: {
          name: title,
          dueDate: new Date(dueDate.year, dueDate.month, dueDate.day),
          pointEstimate,
          status: 'TODO',
          tags,
          assigneeId,
        },
      },
    })

    onClose()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="add-task-form">
      <div className="add-task-form__header">
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

      <div className="add-task-form__body">
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

      {hasErrors && (
        <span role="alert" className="add-task-form__error body body--s">
          Please fill in the title, estimate, assignee, and due date.
        </span>
      )}

      <div className="add-task-form__footer">
        <Button variant="secondary" name="Cancel" onClick={onClose} />
        <Button variant="primary" name="Create" type="submit" />
      </div>
    </form>
  )
}

export default AddTaskForm
