import { useEffect, useEffectEvent } from 'react'
import './Toast.css'
import IconButton from '@shared/components/Buttons/IconButton/IconButton'
import CancelIcon from '@shared/icons/CancelIcon'

export type ToastVariant = 'success' | 'error'

const TOAST_DURATION_MS = 4000

function Toast({
  message,
  variant,
  onClose,
  duration = TOAST_DURATION_MS,
}: {
  readonly message: string
  readonly variant: ToastVariant
  readonly onClose: () => void
  readonly duration?: number
}) {
  const closeAfterTimeout = useEffectEvent(onClose)

  useEffect(() => {
    const timeoutId = setTimeout(closeAfterTimeout, duration)

    return () => clearTimeout(timeoutId)
  }, [message, duration])

  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      className={`toast toast--${variant}`}
    >
      <p className="toast__message body body--m">{message}</p>
      <IconButton
        label="Dismiss notification"
        icon={<CancelIcon />}
        onClick={onClose}
      />
    </div>
  )
}

export default Toast
