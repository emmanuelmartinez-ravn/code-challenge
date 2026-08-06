import { useEffect, useRef, useState, type ReactNode } from 'react'
import SelectButtonContent from '../Select/SelectButtonContent'
import './Multiselect.css'
import Badge from '../Badge/Badge'

const handleKeyDown = (event: React.KeyboardEvent) => {
  if (
    event.key === 'Enter' &&
    event.target instanceof HTMLInputElement &&
    event.target.type === 'checkbox'
  ) {
    event.preventDefault()
  }
}

function Multiselect({
  name,
  title,
  icon,
  options,
  values,
  onChange,
}: {
  readonly name: string
  readonly icon?: ReactNode
  readonly title: string
  readonly options: {
    value: string
    label: string
  }[]
  readonly values: string[]
  readonly onChange: (values: string[]) => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  const selectRef = useRef<HTMLDivElement>(null)
  const selectButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div className="multiselect" ref={selectRef} onKeyDown={handleKeyDown}>
      <button
        className="button multiselect-button"
        type="button"
        ref={selectButtonRef}
        onClick={() => setIsOpen(!isOpen)}
      >
        {values.length > 0 ? (
          values.map((value) => (
            <Badge
              key={value}
              name={
                options.find((option) => option.value === value)?.label ?? value
              }
            />
          ))
        ) : (
          <SelectButtonContent name={name} icon={icon} />
        )}
      </button>

      {isOpen && (
        <div className="multiselect__options">
          <span className="multiselect__options__title body body--l body--bold">
            {title}
          </span>

          <ul className="multiselect__options__list">
            {options.map((option) => (
              <li key={option.value}>
                <label className="multiselect__options__list__item">
                  <input
                    type="checkbox"
                    checked={values.includes(option.value)}
                    onChange={() => {
                      onChange(
                        values.includes(option.value)
                          ? values.filter((value) => value !== option.value)
                          : [...values, option.value],
                      )
                    }}
                  />

                  <span>{option.label}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Multiselect
