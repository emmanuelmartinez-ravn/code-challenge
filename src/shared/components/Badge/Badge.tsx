import './Badge.css'

function Badge({
  label,
  name,
  icon,
  variant = 'default',
}: {
  readonly label?: string
  readonly name: string
  readonly icon?: React.ReactNode
  readonly variant?: 'default' | 'primary' | 'secondary' | 'tertiary'
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
