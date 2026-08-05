import './EstimateSelectButton.css'
import PlusLessIcon from '@shared/icons/PlusLessIcon'

function EstimateSelectButton({ name = '' }: { readonly name?: string }) {
  return (
    <div className="estimate-select-option body body--s">
      <PlusLessIcon />
      {name ? <span>{name}</span> : null}
    </div>
  )
}

export default EstimateSelectButton
