import Avatar from '@shared/components/Avatar/Avatar'
import './AssigneeSelectOption.css'

function AssigneeSelectOption({ name = '' }: { readonly name?: string }) {
  return (
    <div className="estimate-select-option body body--s">
      <Avatar size="s" />
      {name ? <span>{name}</span> : null}
    </div>
  )
}

export default AssigneeSelectOption
