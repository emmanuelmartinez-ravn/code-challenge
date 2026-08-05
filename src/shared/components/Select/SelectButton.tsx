import type { ReactNode } from 'react'
import './SelectButton.css'

function SelectButton({
  name = '',
  icon,
  label,
  onClick,
}: {
  readonly name?: string
  readonly icon?: ReactNode
  readonly label: string
  readonly onClick?: () => void
}) {
  return (
    <button
      aria-label={label}
      className="button select-button"
      onClick={onClick}
      type="button"
    >
      {icon ?? null}
      {name ? <span>{name}</span> : null}
    </button>
  )
}

export default SelectButton
