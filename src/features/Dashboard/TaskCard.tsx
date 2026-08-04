import Button from '@shared/components/Buttons/Button/Button'
import './TaskCard.css'
import OptionsIcon from '@shared/icons/OptionsIcon'
import Badge from '@shared/components/Badge/Badge'
import ClockIcon from '@shared/icons/ClockIcon'
import Avatar from '@shared/components/Avatar/Avatar'
import AttachmentIcon from '@shared/icons/AttachmentIcon'
import BranchIcon from '@shared/icons/BranchIcon'
import CommentIcon from '@shared/icons/CommentIcon'

function formatDueDate(dueDate: Date): {
  isOverdue: boolean
  formatted: string
} {
  const due = new Date(dueDate)
  const current = new Date()

  const normalizeDate = (date: Date) => {
    const normalized = new Date(date)
    normalized.setHours(0, 0, 0, 0)
    return normalized
  }

  const dueDay = normalizeDate(due)
  const currentDay = normalizeDate(current)

  const difference = dueDay.getTime() - currentDay.getTime()

  const oneDay = 24 * 60 * 60 * 1000

  if (difference === oneDay) {
    return {
      isOverdue: false,
      formatted: 'TOMORROW',
    }
  }

  if (difference === -oneDay) {
    return {
      isOverdue: true,
      formatted: 'YESTERDAY',
    }
  }

  if (difference === 0) {
    return {
      isOverdue: false,
      formatted: 'TODAY',
    }
  }

  const parts = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).formatToParts(due)

  const day = parts.find(({ type }) => type === 'day')?.value
  const month = parts.find(({ type }) => type === 'month')?.value
  const year = parts.find(({ type }) => type === 'year')?.value

  return {
    isOverdue: difference < 0,
    formatted: `${day} ${month}, ${year}`.toUpperCase(),
  }
}

export type Task = {
  title: string
  points: number
  asignee: string
  tags: string[]
  dueDate: Date
}

function TaskCard({ task }: { readonly task: Task }) {
  const { title, points, asignee, tags, dueDate } = task

  const { isOverdue, formatted } = formatDueDate(dueDate)
  return (
    <article className="task-card">
      <div className="task-card__header">
        <h3 className="body body--xl body--bold">
          <span className="sr-only">Task card: </span>
          {title}
        </h3>
        <Button label="More options" icon={<OptionsIcon />} ghost={true} />
      </div>
      <div className="task-card__points body--bold">
        <p className="body body--m">
          <span className="sr-only">Estimated: </span>
          {points} points
        </p>
        <Badge
          label="Due date"
          name={formatted}
          icon={<ClockIcon />}
          variant={isOverdue ? 'primary' : 'default'}
        />
      </div>
      <div className="task-card__tags">
        {tags.map((tag) => (
          <Badge key={tag} label="Tag" name={tag} />
        ))}
      </div>
      <div className="task-card__footer">
        <Avatar src={asignee} alt="Asignee" size="s" />
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
