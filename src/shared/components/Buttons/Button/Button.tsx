import type { ReactNode } from 'react'
import './Button.css'

export type ButtonVariant = 'primary' | 'secondary'

function Button({
  name = '',
  icon,
  label,
  onClick,
  variant = 'primary',
}: {
  readonly name?: string
  readonly icon?: ReactNode
  readonly label: string
  readonly onClick?: () => void
  readonly variant?: ButtonVariant
}) {
  return (
    <button
      aria-label={label}
      className={`button ${variant === 'primary' ? 'button--primary' : 'button--secondary'}`}
      onClick={onClick}
      type="button"
    >
      {name ? <span>{name}</span> : null}
      {icon ?? null}
    </button>
  )
}

export default Button
