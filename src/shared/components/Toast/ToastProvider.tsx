import { useCallback, useState, type ReactNode } from 'react'
import Toast, { type ToastVariant } from './Toast'
import { ToastContext } from './ToastContext'

type ActiveToast = {
  id: number
  message: string
  variant: ToastVariant
}

function ToastProvider({ children }: { readonly children: ReactNode }) {
  const [activeToast, setActiveToast] = useState<ActiveToast | null>(null)

  const showToast = useCallback((message: string, variant: ToastVariant) => {
    setActiveToast((current) => ({
      id: (current?.id ?? 0) + 1,
      message,
      variant,
    }))
  }, [])

  const closeToast = useCallback(() => setActiveToast(null), [])

  return (
    <ToastContext value={showToast}>
      {children}
      {activeToast && (
        <Toast
          key={activeToast.id}
          message={activeToast.message}
          variant={activeToast.variant}
          onClose={closeToast}
        />
      )}
    </ToastContext>
  )
}

export default ToastProvider
