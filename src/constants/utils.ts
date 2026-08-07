import type { PointEstimate } from './PointEstimate'
import { STATUSES, type Status } from './Status'
import type { Tag } from './Tag'
import type { Task } from './Task'

export function formatDate(dueDate: Date): {
  status: 'onTime' | 'near' | 'overdue'
  formatted: string
} {
  const parseAsLocal = (date: Date) => {
    return new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds(),
      date.getUTCMilliseconds(),
    )
  }

  const normalizeDate = (date: Date) => {
    const normalized = new Date(date)

    normalized.setHours(0, 0, 0, 0)

    return normalized
  }

  const due = parseAsLocal(new Date(dueDate))
  const current = new Date()

  const dueDay = normalizeDate(due)
  const currentDay = normalizeDate(current)

  const oneDay = 24 * 60 * 60 * 1000
  const difference = dueDay.getTime() - currentDay.getTime()

  let formatted: string

  if (difference === oneDay) {
    formatted = 'Tomorrow'
  } else if (difference === -oneDay) {
    formatted = 'Yesterday'
  } else if (difference === 0) {
    formatted = 'Today'
  } else {
    formatted = new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(due)
  }

  let status: 'onTime' | 'near' | 'overdue'

  if (difference < 0) {
    status = 'overdue'
  } else if (difference <= 2 * oneDay) {
    status = 'near'
  } else {
    status = 'onTime'
  }

  return {
    status,
    formatted,
  }
}

export function pointEstimateToNumber(text: PointEstimate): number {
  switch (text) {
    case 'ZERO':
      return 0
    case 'ONE':
      return 1
    case 'TWO':
      return 2
    case 'FOUR':
      return 4
    case 'EIGHT':
      return 8
  }
}

export function statusToLabel(status: Status): string {
  switch (status) {
    case 'BACKLOG':
      return 'Backlog'
    case 'CANCELLED':
      return 'Cancelled'
    case 'DONE':
      return 'Done'
    case 'IN_PROGRESS':
      return 'In Progress'
    case 'TODO':
      return 'To do'
  }
}

export function tagToLabel(tag: Tag): string {
  switch (tag) {
    case 'ANDROID':
      return 'Android'
    case 'IOS':
      return 'iOS'
    case 'NODE_JS':
      return 'Node.js'
    case 'RAILS':
      return 'Ruby on Rails'
    case 'REACT':
      return 'React'
  }
}

export function toDateParts(date: Date) {
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
  }
}

export function getInitialDate() {
  return toDateParts(new Date())
}

export function groupTasksByStatus(tasks?: Task[]): Map<Status, Task[]> {
  const tasksByStatus = new Map<Status, Task[]>()

  STATUSES.forEach((status) => {
    tasksByStatus.set(status, [])
  })

  tasks?.forEach((task) => {
    tasksByStatus.get(task.status)?.push(task)
  })

  tasksByStatus.forEach((statusTasks) => {
    statusTasks.sort((a, b) => a.position - b.position)
  })

  return tasksByStatus
}
