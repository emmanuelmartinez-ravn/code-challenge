import './Badge.css'

function Badge({
  name,
  icon,
  variant = 'default',
}: {
  readonly name: string
  readonly icon?: React.ReactNode
  readonly variant?: 'default' | 'primary' | 'secondary' | 'tertiary'
}) {
  return (
    <span className={`badge badge--${variant} body--bold`}>
      {icon ?? null}
      {name}
    </span>
  )
}

export default Badge
