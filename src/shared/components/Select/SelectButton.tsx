import type { ReactNode } from 'react'
import './SelectButton.css'

type SelectButtonProps =
  | {
      readonly name: string
      readonly label?: never
      readonly icon?: ReactNode
      readonly onClick?: () => void
      readonly ref?: React.Ref<HTMLButtonElement>
    }
  | {
      readonly name?: never
      readonly label: string
      readonly icon?: ReactNode
      readonly onClick?: () => void
      readonly ref?: React.Ref<HTMLButtonElement>
    }

function SelectButton({ name, label, icon, onClick, ref }: SelectButtonProps) {
  const accessibleName = name ?? label

  return (
    <button
      aria-label={accessibleName}
      className="button select-button body body--m"
      onClick={onClick}
      type="button"
      ref={ref}
    >
      {icon ?? null}
      <span>{accessibleName}</span>
    </button>
  )
}

export default SelectButton
