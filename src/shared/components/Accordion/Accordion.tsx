import TriangleDownIcon from '@shared/icons/TriangleDownIcon'
import './Accordion.css'
import { useState } from 'react'

function Accordion({
  title,
  subtitle,
  children,
}: {
  readonly title: string
  readonly subtitle?: string
  readonly children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="accordion">
      <span
        className={`accordion__header ${isOpen ? 'accordion__header--open' : ''}`}
      >
        <button
          type="button"
          className="body body--bold body--l"
          onClick={() => setIsOpen(!isOpen)}
        >
          <TriangleDownIcon />
          <span>{title}</span>

          {subtitle ? <span>{subtitle}</span> : null}
        </button>
      </span>

      {isOpen && <div className="accordion__content">{children}</div>}
    </div>
  )
}

export default Accordion
