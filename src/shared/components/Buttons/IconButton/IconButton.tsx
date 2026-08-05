import type { ReactNode } from 'react'
import './IconButton.css'
function Button({
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
      className={`icon-button`}
      onClick={onClick}
      type="button"
    >
      {name ? <span>{name}</span> : null}
      {icon ?? null}
    </button>
  )
}

export default Button
