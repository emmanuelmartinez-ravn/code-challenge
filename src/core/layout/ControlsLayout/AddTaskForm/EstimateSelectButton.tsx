import './EstimateSelectButton.css'
import PlusLessIcon from '@shared/icons/PlusLessIcon'

function EstimateSelectButton({
  name = '',
  label,
  onClick,
}: {
  readonly name?: string
  readonly label: string
  readonly onClick?: () => void
}) {
  return (
    <button
      aria-label={label}
      className="button estimate-select-button body body--s"
      onClick={onClick}
      type="button"
    >
      <PlusLessIcon />
      {name ? <span>{name}</span> : null}
    </button>
  )
}

export default EstimateSelectButton
