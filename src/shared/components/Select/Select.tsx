import type { ReactNode } from 'react'

function Select({
  name,
  options,
}: {
  readonly name: string
  readonly options: ReactNode[]
}) {
  return (
    <div className="select">
      <button>
        <StatusIcon />
        Overdue
      </button>

      {isOpen && (
        <ul>
          <li>
            <StatusIcon />
            Overdue
          </li>
          <li>
            <StatusIcon />
            Done
          </li>
        </ul>
      )}
    </div>
  )
}

export default Select
