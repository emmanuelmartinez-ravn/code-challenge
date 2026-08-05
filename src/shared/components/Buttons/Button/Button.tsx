import type { ReactNode } from 'react'
import './Button.css'

function Button({
  name = '',
  icon,
  label,
  onClick,
  ghost = false,
}: {
  readonly name?: string
  readonly icon?: ReactNode
  readonly label: string
  readonly onClick?: () => void
  readonly ghost?: boolean
}) {
  return (
    <button
      aria-label={label}
      className={`button ${ghost ? 'button--ghost' : 'button--primary'}`}
      onClick={onClick}
      type="button"
    >
      {name ? <span>{name}</span> : null}
      {icon ?? null}
    </button>
  )
}

export default Button
