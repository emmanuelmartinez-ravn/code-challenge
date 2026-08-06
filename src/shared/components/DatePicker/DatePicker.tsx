import ChevronLeftIcon from '@shared/icons/ChevronLeftIcon'
import ChevronRightIcon from '@shared/icons/ChevronRightIcon'
import DoubleChevronLeftIcon from '@shared/icons/DoubleChevronLeftIcon'
import DoubleChevronRightIcon from '@shared/icons/DoubleChevronRightIcon'
import IconButton from '../Buttons/IconButton/IconButton'
import './DatePicker.css'
import { useState, type Dispatch, type SetStateAction } from 'react'
import { formatDate } from '@constants/utils'

function getInitialConfig() {
  const today = new Date()

  return {
    year: today.getFullYear(),
    month: today.getMonth(),
    day: today.getDate(),
  }
}

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

const changeMonth = (
  amount: number,
  setSelectedDate: Dispatch<
    SetStateAction<{
      year: number
      month: number
      day: number
    }>
  >,
) => {
  setSelectedDate((current) => {
    const newDate = new Date(current.year, current.month + amount, 1)

    return {
      ...current,
      year: newDate.getFullYear(),
      month: newDate.getMonth(),
    }
  })
}

const changeYear = (
  amount: number,
  setSelectedDate: Dispatch<
    SetStateAction<{
      year: number
      month: number
      day: number
    }>
  >,
) => {
  setSelectedDate((current) => ({
    ...current,
    year: current.year + amount,
  }))
}

const selectDay = (
  day: number,
  currentMonth: boolean,
  setSelectedDate: Dispatch<
    SetStateAction<{
      year: number
      month: number
      day: number
    }>
  >,
) => {
  setSelectedDate((current) => {
    const nextMonth = day > 15 ? -1 : 1

    const newDate = new Date(
      current.year,
      current.month + (currentMonth ? 0 : nextMonth),
      day,
    )

    return {
      year: newDate.getFullYear(),
      month: newDate.getMonth(),
      day: newDate.getDate(),
    }
  })
}

function DatePicker() {
  const [selectedDate, setSelectedDate] = useState(() => getInitialConfig())
  const [today] = useState(() => getInitialConfig())

  const monthName = new Date(selectedDate.year, selectedDate.month)
    .toLocaleString('en-US', { month: 'long' })
    .slice(0, 3)
    .replace(/^./, (char) => char.toUpperCase())

  const calendarDays = getCalendarDays(selectedDate.year, selectedDate.month)

  return (
    <div className="date-picker">
      <div className="date-picker__controls">
        <div className="date-picker__controls__left">
          <IconButton
            icon={<DoubleChevronLeftIcon />}
            label="Previous year"
            onClick={() => changeYear(-1, setSelectedDate)}
          />

          <IconButton
            icon={<ChevronLeftIcon />}
            label="Previous month"
            onClick={() => changeMonth(-1, setSelectedDate)}
          />
        </div>

        <span className="body body--s body--bold">
          {`${monthName} ${selectedDate.year}`}
        </span>
        <div className="date-picker__controls__right">
          <IconButton
            icon={<ChevronRightIcon />}
            label="Next month"
            onClick={() => changeMonth(1, setSelectedDate)}
          />

          <IconButton
            icon={<DoubleChevronRightIcon />}
            label="Next year"
            onClick={() => changeYear(1, setSelectedDate)}
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
              selectedDate.year === date.year &&
              selectedDate.month === date.month &&
              selectedDate.day === date.day
                ? 'selected'
                : ''
            }`}
            type="button"
            onClick={() =>
              selectDay(date.day, date.currentMonth, setSelectedDate)
            }
          >
            {date.day}
          </button>
        ))}
      </div>
      <div className="date-picker__selected">
        <span>
          {
            formatDate(
              new Date(selectedDate.year, selectedDate.month, selectedDate.day),
            ).formatted
          }
        </span>
      </div>
    </div>
  )
}

export default DatePicker
