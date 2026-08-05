import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import './Modal.css'

function Modal({ children }: { children: ReactNode }) {
  return createPortal(
    <div className="modal">
      <div className="modal__content">{children}</div>
    </div>,
    document.body,
  )
}

export default Modal
