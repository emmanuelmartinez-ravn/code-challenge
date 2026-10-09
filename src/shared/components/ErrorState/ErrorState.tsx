import './ErrorState.css'
import Button from '@shared/components/Buttons/Button/Button'

function ErrorState({
  title,
  message,
  onRetry,
}: {
  readonly title: string
  readonly message: string
  readonly onRetry: () => void
}) {
  return (
    <div role="alert" className="error-state">
      <p className="error-state__title body body--l body--bold">{title}</p>
      <p className="body body--m">{message}</p>
      <Button variant="primary" name="Retry" onClick={onRetry} />
    </div>
  )
}

export default ErrorState
