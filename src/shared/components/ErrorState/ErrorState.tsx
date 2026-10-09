import './ErrorState.css'
import Button from '@shared/components/Buttons/Button/Button'

function ErrorState({
  message,
  onRetry,
}: {
  readonly message: string
  readonly onRetry: () => void
}) {
  return (
    <div role="alert" className="error-state">
      <p className="body body--l">{message}</p>
      <Button variant="primary" name="Retry" onClick={onRetry} />
    </div>
  )
}

export default ErrorState
