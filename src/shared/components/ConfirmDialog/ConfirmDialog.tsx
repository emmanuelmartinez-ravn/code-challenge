import { useState } from 'react'
import './ConfirmDialog.css'
import Modal from '@shared/components/Modal/Modal'
import Button from '@shared/components/Buttons/Button/Button'

function ConfirmDialog({
  title,
  message,
  confirmLabel,
  onConfirm,
  onCancel,
}: {
  readonly title: string
  readonly message: string
  readonly confirmLabel: string
  readonly onConfirm: () => Promise<void>
  readonly onCancel: () => void
}) {
  const [isConfirming, setIsConfirming] = useState(false)

  const confirm = async () => {
    setIsConfirming(true)

    try {
      await onConfirm()
    } finally {
      setIsConfirming(false)
    }
  }

  return (
    <Modal label={title} onClose={onCancel}>
      <div className="confirm-dialog">
        <h2 className="confirm-dialog__title body body--l body--bold">
          {title}
        </h2>
        <p className="confirm-dialog__message body body--m">{message}</p>
        <div className="confirm-dialog__footer">
          <Button variant="secondary" name="Cancel" onClick={onCancel} />
          <Button
            variant="primary"
            name={confirmLabel}
            onClick={confirm}
            disabled={isConfirming}
          />
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmDialog
