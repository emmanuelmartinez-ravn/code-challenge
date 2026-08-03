import './SidebarItem.css'

function SidebarItem({
  name,
  icon,
  active,
  onClick,
}: {
  readonly name: string
  readonly icon?: React.ReactNode
  readonly active: boolean
  readonly onClick?: () => void
}) {
  return (
    <button
      className={`body body--bold body--m sidebar-item sidebar-item${active ? '--selected' : ''}`}
      onClick={onClick}
    >
      {icon ?? <div className="sidebar-item__icon--default" />}

      {name.toUpperCase()}
    </button>
  )
}

export default SidebarItem
