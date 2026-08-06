import type { ReactNode } from 'react'
import './Button.css'

export type ButtonVariant = 'primary' | 'secondary'
type ButtonProps = {
  readonly icon?: ReactNode
  readonly onClick?: () => void
  readonly variant?: ButtonVariant
  readonly type?: 'button' | 'submit' | 'reset'
} & (
  | {
      readonly name: string
      readonly label?: never
    }
  | {
      readonly label: string
      readonly name?: never
    }
)

function Button({
  name = '',
  icon,
  label,
  onClick,
  variant = 'primary',
  type = 'button',
}: ButtonProps) {
  return (
    <button
      aria-label={label}
      className={`button ${variant === 'primary' ? 'button--primary' : 'button--secondary'}`}
      onClick={onClick}
      type={type}
    >
      {icon ?? null}
      {name ? <span>{name}</span> : null}
    </button>
  )
}

export default Button
