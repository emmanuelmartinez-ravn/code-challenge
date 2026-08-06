import ChevronLeftIcon from '@shared/icons/ChevronLeftIcon'
import ChevronRightIcon from '@shared/icons/ChevronRightIcon'
import DoubleChevronLeftIcon from '@shared/icons/DoubleChevronLeftIcon'
import DoubleChevronRightIcon from '@shared/icons/DoubleChevronRightIcon'
import IconButton from '../Buttons/IconButton/IconButton'
import './DatePicker.css'
import { useState, type Dispatch, type SetStateAction } from 'react'
import { formatDate, getInitialDate } from '@constants/utils'

function getCalendarDays(year: number, month: number) {
  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)

  const daysInPreviousMonth = new Date(year, month, 0).getDate()
  const daysInCurrentMonth = lastDayOfMonth.getDate()

  const firstWeekDay = firstDayOfMonth.getDay()

  const days = []

  for (let i = firstWeekDay - 1; i >= 0; i--) {
    days.push({
      day: daysInPreviousMonth - i,
      month: month - 1,
      year,
      currentMonth: false,
    })
  }

  for (let i = 1; i <= daysInCurrentMonth; i++) {
    days.push({
      day: i,
      month,
      year,
      currentMonth: true,
    })
  }

  let nextDay = 1

  while (days.length < 42) {
    days.push({
      day: nextDay,
      month: month + 1,
      year,
      currentMonth: false,
    })

    nextDay++
  }

  return days
}

function changeMonth(
  amount: number,
  setViewDate: Dispatch<
    SetStateAction<{
      year: number
      month: number
      day: number
    }>
  >,
) {
  setViewDate((current) => {
    const newDate = new Date(current.year, current.month + amount, 1)

    return {
      ...current,
      year: newDate.getFullYear(),
      month: newDate.getMonth(),
    }
  })
}

function changeYear(
  amount: number,
  setViewDate: Dispatch<
    SetStateAction<{
      year: number
      month: number
      day: number
    }>
  >,
) {
  setViewDate((current) => ({
    ...current,
    year: current.year + amount,
  }))
}

function DatePicker({
  value,
  onChange,
}: {
  readonly value: {
    year: number
    month: number
    day: number
  }
  readonly onChange: (value: {
    year: number
    month: number
    day: number
  }) => void
}) {
  const [viewDate, setViewDate] = useState(value)
  const [today] = useState(getInitialDate())

  const monthName = new Date(viewDate.year, viewDate.month)
    .toLocaleString('en-US', { month: 'long' })
    .slice(0, 3)
    .replace(/^./, (char) => char.toUpperCase())

  const calendarDays = getCalendarDays(viewDate.year, viewDate.month)

  return (
    <div className="date-picker">
      <div className="date-picker__controls">
        <div className="date-picker__controls__left">
          <IconButton
            icon={<DoubleChevronLeftIcon />}
            label="Previous year"
            onClick={() => changeYear(-1, setViewDate)}
          />

          <IconButton
            icon={<ChevronLeftIcon />}
            label="Previous month"
            onClick={() => changeMonth(-1, setViewDate)}
          />
        </div>

        <span className="body body--s body--bold">
          {`${monthName} ${viewDate.year}`}
        </span>
        <div className="date-picker__controls__right">
          <IconButton
            icon={<ChevronRightIcon />}
            label="Next month"
            onClick={() => changeMonth(1, setViewDate)}
          />

          <IconButton
            icon={<DoubleChevronRightIcon />}
            label="Next year"
            onClick={() => changeYear(1, setViewDate)}
          />
        </div>
      </div>
      <div className="date-picker__calendar">
        <span>Su</span>
        <span>Mo</span>
        <span>Tu</span>
        <span>We</span>
        <span>Th</span>
        <span>Fr</span>
        <span>Sa</span>
        {calendarDays.map((date) => (
          <button
            key={`${date.year}-${date.month}-${date.day}`}
            className={`calendar-button ${
              !date.currentMonth ? 'outside-month' : ''
            } ${
              today.year === date.year &&
              today.month === date.month &&
              today.day === date.day
                ? 'today'
                : ''
            } ${
              value.year === date.year &&
              value.month === date.month &&
              value.day === date.day
                ? 'selected'
                : ''
            }`}
            type="button"
            onClick={() => {
              setViewDate(date)
              onChange(date)
            }}
          >
            {date.day}
          </button>
        ))}
      </div>
      <div className="date-picker__selected">
        <span>
          {
            formatDate(new Date(viewDate.year, viewDate.month, viewDate.day))
              .formatted
          }
        </span>
      </div>
    </div>
  )
}

export default DatePicker
