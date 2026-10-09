import { useEffect, useEffectEvent, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import './Modal.css'

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
}

function trapFocus(event: KeyboardEvent, container: HTMLElement) {
  const focusableElements = getFocusableElements(container)
  const first = focusableElements[0]
  const last = focusableElements[focusableElements.length - 1]

  if (!first || !last) {
    event.preventDefault()
    return
  }

  const focusIsInside = container.contains(document.activeElement)

  if (event.shiftKey && (document.activeElement === first || !focusIsInside)) {
    event.preventDefault()
    last.focus()
    return
  }

  if (!event.shiftKey && (document.activeElement === last || !focusIsInside)) {
    event.preventDefault()
    first.focus()
  }
}

function Modal({
  label,
  onClose,
  children,
}: {
  readonly label: string
  readonly onClose: () => void
  readonly children: ReactNode
}) {
  const dialogRef = useRef<HTMLDivElement>(null)

  const closeOnEscape = useEffectEvent(onClose)

  useEffect(() => {
    const dialog = dialogRef.current
    const previouslyFocused = document.activeElement

    if (dialog) {
      const [firstFocusable] = getFocusableElements(dialog)
      const elementToFocus = firstFocusable ?? dialog
      elementToFocus.focus()
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeOnEscape()
        return
      }

      if (event.key === 'Tab' && dialog) {
        trapFocus(event, dialog)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)

      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus()
      }
    }
  }, [])

  return createPortal(
    <div
      className="modal"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className="modal__content"
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}

export default Modal
