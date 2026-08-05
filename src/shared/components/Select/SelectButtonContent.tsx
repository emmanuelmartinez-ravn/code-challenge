import type { ReactNode } from 'react'
import './SelectButtonContent.css'

function SelectButtonContent({
  name,
  icon,
}: {
  readonly name: string
  readonly icon?: ReactNode
}) {
  return (
    <div className="body body--m select-button-content">
      {icon ?? null}
      <span>{name}</span>
    </div>
  )
}

export default SelectButtonContent
