import './EstimateSelectOption.css'
import PlusLessIcon from '@shared/icons/PlusLessIcon'

function EstimateSelectOption({ name = '' }: { readonly name?: string }) {
  return (
    <div className="estimate-select-option body body--m">
      <PlusLessIcon />
      {name ? <span>{name}</span> : null}
    </div>
  )
}

export default EstimateSelectOption
