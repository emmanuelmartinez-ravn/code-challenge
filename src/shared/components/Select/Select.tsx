import { useEffect, useRef, useState, type ReactNode } from 'react'
import SelectButtonContent from './SelectButtonContent'
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
    node: ReactNode
  }>({
    value: null,
    node: <SelectButtonContent name={name} icon={icon} />,
  })

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
    <div className="select" ref={selectRef}>
      <button
        className="button select-button"
        type="button"
        ref={selectButtonRef}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption.node}
      </button>

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
                      node: option.node,
                    })
                    setIsOpen(false)
                    selectButtonRef.current?.focus()
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
