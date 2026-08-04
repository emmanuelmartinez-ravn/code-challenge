import type { PointEstimate } from './PointEstimate'

export function formatDueDate(dueDate: Date): {
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
      formatted: 'Tomorrow',
    }
  }

  if (difference === -oneDay) {
    return {
      isOverdue: true,
      formatted: 'Yesterday',
    }
  }

  if (difference === 0) {
    return {
      isOverdue: false,
      formatted: 'Today',
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
    formatted: `${day} ${month}, ${year}`,
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
