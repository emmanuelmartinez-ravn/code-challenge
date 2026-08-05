import { useEffect, useRef, useState, type ReactNode } from 'react'
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

  const selectRef = useRef<HTMLDivElement>(null)
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
    <div className="select" ref={selectRef}>
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
                  className="button select__options__list__item"
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
