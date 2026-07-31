import './SidebarItem.css'

function SidebarItem({
  name,
  icon,
  selectedName,
  onClick,
}: {
  readonly name: string
  readonly icon?: React.ReactNode
  readonly selectedName: string
  readonly onClick?: () => void
}) {
  return (
    <button
      className={`body body--bold body--m sidebar-item sidebar-item${selectedName == name ? '--selected' : ''}`}
      onClick={onClick}
    >
      {icon ?? <div className="sidebar-item__icon--default" />}

      {name.toUpperCase()}
    </button>
  )
}

export default SidebarItem
