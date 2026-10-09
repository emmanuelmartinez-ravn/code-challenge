import { render, screen, fireEvent } from '@testing-library/react'
import ErrorState from './ErrorState'

describe('ErrorState', () => {
  it('announces the error message as an alert', () => {
    render(<ErrorState message="Couldn't load your tasks." onRetry={() => {}} />)

    expect(screen.getByRole('alert')).toHaveTextContent(
      "Couldn't load your tasks.",
    )
  })

  it('calls onRetry when Retry is clicked', () => {
    const onRetry = vi.fn()
    render(<ErrorState message="Couldn't load your tasks." onRetry={onRetry} />)

    fireEvent.click(screen.getByRole('button', { name: 'Retry' }))

    expect(onRetry).toHaveBeenCalledTimes(1)
  })
})
