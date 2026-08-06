import { useEffect, useRef, useState, type ReactNode } from 'react'
import SelectButtonContent from '../Select/SelectButtonContent'
import './Select.css'

function Multiselect({
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
  }[]
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

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
        {selectedOptions.length > 0 ? (
          <span className="select-button__selected-options">
            {selectedOptions.map((value) => {
              const option = options.find((option) => option.value === value)

              return <span key={value}>{option?.label}</span>
            })}
          </span>
        ) : (
          <SelectButtonContent name={name} icon={icon} />
        )}
      </button>

      {isOpen && (
        <div className="select__options">
          <span className="select__options__title body body--l body--bold">
            {title}
          </span>

          <ul
            className="select__options__list"
            role="listbox"
            aria-multiselectable="true"
          >
            {options.map((option) => (
              <li
                key={option.value}
                role="option"
                aria-selected={selectedOptions.includes(option.value)}
              >
                <button
                  className="button select__options__list__item"
                  type="button"
                  aria-label={option.label}
                  onClick={() => {
                    setSelectedOptions((current) => {
                      const isSelected = current.includes(option.value)

                      if (isSelected) {
                        return current.filter((value) => value !== option.value)
                      }

                      return [...current, option.value]
                    })
                  }}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Multiselect
