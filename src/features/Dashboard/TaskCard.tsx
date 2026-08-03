import Button from '@shared/components/Buttons/Button/Button'
import './TaskCard.css'
import OptionsIcon from '@shared/icons/OptionsIcon'
import Badge from '@shared/components/Badge/Badge'
import ClockIcon from '@shared/icons/ClockIcon'

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

function TaskCard({
  title,
  points,
  asignee,
  labels,
  dueDate,
}: {
  readonly title: string
  readonly points: number
  readonly asignee: string
  readonly labels: string[]
  readonly dueDate: Date
}) {
  const { isOverdue, formatted } = formatDueDate(dueDate)
  return (
    <div className="task-card">
      <div className="task-card__header">
        <h2>{title}</h2>
        <Button label="More options" icon={<OptionsIcon />} ghost={true} />
      </div>
      <div className="task-card__points">
        <p>{points} points</p>
        <Badge
          name={formatted}
          icon={<ClockIcon />}
          variant={isOverdue ? 'primary' : 'default'}
        />
        <p>{dueDate.toLocaleDateString()}</p>
      </div>
      <div>
        {labels.map((label) => (
          <div key={label}>{label}</div>
        ))}
      </div>
      <div>
        <p>{asignee}</p>
      </div>
    </div>
  )
}

export default TaskCard
