import './Button.css'

function Button({
  name = '',
  icon,
  label,
  onClick,
  ghost = false,
}: {
  readonly name?: string
  readonly icon?: React.ReactNode
  readonly label: string
  readonly onClick?: () => void
  readonly ghost?: boolean
}) {
  return (
    <button
      aria-label={label}
      className={`button ${ghost ? 'button--ghost' : 'button--primary'}`}
      onClick={onClick}
    >
      <span>{name}</span>
      {icon ?? null}
    </button>
  )
}

export default Button
