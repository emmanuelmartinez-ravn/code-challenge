import { useNavigate } from 'react-router'
import Button from '@shared/components/Buttons/Button/Button'
import './NotFoundPage.css'

function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <section className="not-found-page">
      <p className="display display--xl display--bold">404</p>
      <h1 className="display display--s display--bold">Page not found</h1>
      <p className="body body--l not-found-page__description">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Button
        variant="primary"
        name="Back to dashboard"
        onClick={() => navigate('/dashboard')}
      />
    </section>
  )
}

export default NotFoundPage
