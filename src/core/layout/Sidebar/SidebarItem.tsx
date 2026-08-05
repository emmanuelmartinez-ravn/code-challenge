import type { ReactNode } from 'react'
import './SidebarItem.css'

function SidebarItem({
  name,
  icon,
  selected,
  onClick,
}: {
  readonly name: string
  readonly icon?: ReactNode
  readonly selected: boolean
  readonly onClick?: () => void
}) {
  return (
    <button
      className={`body body--bold body--m sidebar-item sidebar-item${selected ? '--selected' : ''}`}
      onClick={onClick}
      type="button"
    >
      {icon ?? <div className="sidebar-item__icon--default" />}

      {name.toUpperCase()}
    </button>
  )
}

export default SidebarItem
