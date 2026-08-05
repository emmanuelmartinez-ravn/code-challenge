import { useState, type ReactNode } from 'react'
import SelectButton from './SelectButton'
import './Select.css'

function Select({
  name,
  title,
  icon,
  options,
}: {
  readonly name: string
  readonly icon?: ReactNode
  readonly title: string
  readonly options: {
    value: string
    label: string
    node: ReactNode
  }[]
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<{
    value: string | null
    label: string
  }>({
    value: null,
    label: name,
  })

  return (
    <div className="select">
      <SelectButton
        name={selectedOption.label}
        label={selectedOption.label}
        icon={icon}
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div className="select__options">
          <span className="select__options__title body body--l body--bold">
            {title}
          </span>
          <ul className="select__options__list">
            {options.map((option) => (
              <li key={option.value}>
                <button
                  className="button"
                  type="button"
                  aria-label={option.label}
                  onClick={() => {
                    setSelectedOption({
                      value: option.value,
                      label: option.label,
                    })
                    setIsOpen(false)
                  }}
                >
                  {option.node}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Select
