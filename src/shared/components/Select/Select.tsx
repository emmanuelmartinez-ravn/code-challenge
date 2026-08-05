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
    node: ReactNode
  }[]
}) {
  const [isOpen, setIsOpen] = useState(false)

  console.log(icon)

  return (
    <div className="select">
      <SelectButton
        name={name}
        label={name}
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
              <li key={option.value}>{option.node}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Select
