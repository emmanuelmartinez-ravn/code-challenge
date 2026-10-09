import { render, screen, fireEvent } from '@testing-library/react'
import ErrorState from './ErrorState'

function renderErrorState(onRetry: () => void = () => {}) {
  return render(
    <ErrorState
      title="Couldn't load your tasks."
      message="The task service isn't responding."
      onRetry={onRetry}
    />,
  )
}

describe('ErrorState', () => {
  it('announces the title and message as an alert', () => {
    renderErrorState()

    expect(screen.getByRole('alert')).toHaveTextContent(
      "Couldn't load your tasks.The task service isn't responding.",
    )
  })

  it('calls onRetry when Retry is clicked', () => {
    const onRetry = vi.fn()
    renderErrorState(onRetry)

    fireEvent.click(screen.getByRole('button', { name: 'Retry' }))

    expect(onRetry).toHaveBeenCalledTimes(1)
  })
})
