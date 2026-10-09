import Avatar from '@shared/components/Avatar/Avatar'
import './AssigneeSelectOption.css'

function AssigneeSelectOption({
  name = '',
  src,
}: {
  readonly name?: string
  readonly src?: string
}) {
  return (
    <div className="estimate-select-option body body--m">
      <Avatar size="s" src={src} />
      {name ? <span>{name}</span> : null}
    </div>
  )
}

export default AssigneeSelectOption
