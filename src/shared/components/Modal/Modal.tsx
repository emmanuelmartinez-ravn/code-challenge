import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'

function Modal({ children }: { children: ReactNode }) {
  return createPortal(<div className="modal">{children}</div>, document.body)
}

export default Modal
