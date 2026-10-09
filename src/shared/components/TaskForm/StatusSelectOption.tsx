import './StatusSelectOption.css'
import PieIcon from '@shared/icons/PieIcon'

function StatusSelectOption({ name = '' }: { readonly name?: string }) {
  return (
    <div className="status-select-option body body--m">
      <PieIcon />
      {name ? <span>{name}</span> : null}
    </div>
  )
}

export default StatusSelectOption
