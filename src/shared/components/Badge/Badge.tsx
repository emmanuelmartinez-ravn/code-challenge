import type { ReactNode } from 'react'
import './Badge.css'

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'

function Badge({
  label,
  name,
  icon,
  variant = 'default',
}: {
  readonly label?: string
  readonly name: string
  readonly icon?: ReactNode
  readonly variant?: BadgeVariant
}) {
  return (
    <span className={`badge badge--${variant} body--bold`}>
      {label ? <span className="sr-only">{label}</span> : null}
      {icon ?? null}
      {name}
    </span>
  )
}

export default Badge
