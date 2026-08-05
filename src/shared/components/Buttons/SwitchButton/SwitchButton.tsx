import type { ReactNode } from 'react'
import './SwitchButton.css'

function SwitchButton({
  icon,
  label,
  selected = false,
  onClick,
}: {
  readonly icon?: ReactNode
  readonly label: string
  readonly onClick?: () => void
  readonly selected?: boolean
}) {
  return (
    <button
      aria-label={label}
      className={`button switch-button switch-button${selected ? '--selected' : ''}`}
      onClick={onClick}
      type="button"
    >
      {icon ?? null}
    </button>
  )
}

export default SwitchButton
