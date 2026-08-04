import Button from '@shared/components/Buttons/Button/Button'
import './TaskCard.css'
import OptionsIcon from '@shared/icons/OptionsIcon'
import Badge from '@shared/components/Badge/Badge'
import ClockIcon from '@shared/icons/ClockIcon'
import Avatar from '@shared/components/Avatar/Avatar'
import AttachmentIcon from '@shared/icons/AttachmentIcon'
import BranchIcon from '@shared/icons/BranchIcon'
import CommentIcon from '@shared/icons/CommentIcon'
import type { Task } from '@constants/Task'
import { formatDueDate, pointEstimateToNumber } from '@constants/utils'

function TaskCard({ task }: { readonly task: Task }) {
  const { assignee, dueDate, name, pointEstimate, tags } = task

  const { isOverdue, formatted } = formatDueDate(dueDate)
  const points = pointEstimateToNumber(pointEstimate)
  return (
    <article className="task-card">
      <div className="task-card__header">
        <h3 className="body body--xl body--bold">
          <span className="sr-only">Task card: </span>
          {name}
        </h3>
        <Button label="More options" icon={<OptionsIcon />} ghost={true} />
      </div>
      <div className="task-card__points body--bold">
        <p className="body body--m">
          <span className="sr-only">Estimated: </span>
          {points} point{points !== 1 ? 's' : ''}
        </p>
        <Badge
          label="Due date"
          name={formatted.toUpperCase()}
          icon={<ClockIcon />}
          variant={isOverdue ? 'primary' : 'default'}
        />
      </div>
      <div className="task-card__tags">
        {tags
          ? tags.map((tag) => <Badge key={tag} label="Tag" name={tag} />)
          : null}
      </div>
      <div className="task-card__footer">
        <Avatar src={assignee.avatar} alt="Assignee" size="s" />
        <div className="task-card__footer__actions">
          <span aria-label="1 Attachments">
            <AttachmentIcon />
          </span>
          <span aria-label="5 Branches">
            <p>5</p>
            <BranchIcon />
          </span>
          <span aria-label="3 Comments">
            <p>3</p>
            <CommentIcon />
          </span>
        </div>
      </div>
    </article>
  )
}

export default TaskCard
