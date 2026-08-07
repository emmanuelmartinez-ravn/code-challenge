import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import IconButton from '@shared/components/Buttons/IconButton/IconButton'
import Button from '@shared/components/Buttons/Button/Button'
import Tooltip from '@shared/components/Tooltip/Tooltip'
import Modal from '@shared/components/Modal/Modal'
import EditTaskForm from './EditTaskForm/EditTaskForm'
import './TaskCard.css'
import OptionsIcon from '@shared/icons/OptionsIcon'
import EditIcon from '@shared/icons/EditIcon'
import DeleteIcon from '@shared/icons/DeleteIcon'
import Badge from '@shared/components/Badge/Badge'
import ClockIcon from '@shared/icons/ClockIcon'
import Avatar from '@shared/components/Avatar/Avatar'
import AttachmentIcon from '@shared/icons/AttachmentIcon'
import BranchIcon from '@shared/icons/BranchIcon'
import CommentIcon from '@shared/icons/CommentIcon'
import type { Task } from '@constants/Task'
import { formatDate, pointEstimateToNumber } from '@constants/utils'
import { GET_TASKS } from '@graphql/queries/task'
import { DELETE_TASK } from '@graphql/mutations/deleteTask'

function TaskCard({ task }: { readonly task: Task }) {
  const { assignee, dueDate, name, pointEstimate, tags } = task

  const { status, formatted } = formatDate(dueDate)
  const points = pointEstimateToNumber(pointEstimate)

  const [isEditOpen, setIsEditOpen] = useState(false)

  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: [{ query: GET_TASKS, variables: { input: {} } }],
  })

  return (
    <article className="task-card">
      <div className="task-card__header">
        <h3 className="body body--xl body--bold">
          <span className="sr-only">Task card: </span>
          {name}
        </h3>
        <Tooltip
          trigger={<IconButton label="More options" icon={<OptionsIcon />} />}
        >
          <Button
            variant="secondary"
            name="Edit"
            icon={<EditIcon />}
            onClick={() => setIsEditOpen(true)}
          />
          <Button
            variant="secondary"
            name="Delete"
            icon={<DeleteIcon />}
            onClick={() =>
              deleteTask({ variables: { input: { id: task.id } } })
            }
          />
        </Tooltip>
      </div>

      {isEditOpen && (
        <Modal>
          <EditTaskForm task={task} onClose={() => setIsEditOpen(false)} />
        </Modal>
      )}
      <div className="task-card__points body--bold">
        <p className="body body--m">
          <span className="sr-only">Estimated: </span>
          {points} point{points !== 1 ? 's' : ''}
        </p>
        <Badge
          label="Due date"
          name={formatted.toUpperCase()}
          icon={<ClockIcon />}
          variant={(() => {
            if (status === 'overdue') {
              return 'primary'
            }

            if (status === 'near') {
              return 'tertiary'
            }

            return 'secondary'
          })()}
        />
      </div>
      <div className="task-card__tags">
        {tags
          ? tags.map((tag) => <Badge key={tag} label="Tag" name={tag} />)
          : null}
      </div>
      <div className="task-card__footer">
        {assignee ? (
          <Avatar src={assignee.avatar} alt={`${assignee.fullName}`} size="s" />
        ) : null}
        <div className="task-card__footer__actions">
          {/* TODO: attachment/branch/comment icons and counts are hardcoded for mockup purposes */}
          <span>
            <AttachmentIcon />
          </span>
          <span>
            <p>5</p>
            <BranchIcon />
          </span>
          <span>
            <p>3</p>
            <CommentIcon />
          </span>
        </div>
      </div>
    </article>
  )
}

export default TaskCard
