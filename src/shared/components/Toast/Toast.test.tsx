import { render, screen, fireEvent, act } from '@testing-library/react'
import Toast from './Toast'

describe('Toast', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('announces an error message as an alert', () => {
    render(<Toast message="Could not save" variant="error" onClose={() => {}} />)

    expect(screen.getByRole('alert')).toHaveTextContent('Could not save')
  })

  it('announces a success message as a status', () => {
    render(<Toast message="Task saved" variant="success" onClose={() => {}} />)

    expect(screen.getByRole('status')).toHaveTextContent('Task saved')
  })

  it('closes itself after the duration', () => {
    vi.useFakeTimers()
    const onClose = vi.fn()
    render(<Toast message="Task saved" variant="success" onClose={onClose} />)

    act(() => {
      vi.advanceTimersByTime(4000)
    })

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('stays open before the duration ends', () => {
    vi.useFakeTimers()
    const onClose = vi.fn()
    render(<Toast message="Task saved" variant="success" onClose={onClose} />)

    act(() => {
      vi.advanceTimersByTime(3999)
    })

    expect(onClose).not.toHaveBeenCalled()
  })

  it('keeps its countdown when the parent re-renders with a new onClose', () => {
    vi.useFakeTimers()
    const onClose = vi.fn()
    const { rerender } = render(
      <Toast message="Task saved" variant="success" onClose={() => {}} />,
    )

    act(() => {
      vi.advanceTimersByTime(2000)
    })
    rerender(
      <Toast message="Task saved" variant="success" onClose={onClose} />,
    )
    act(() => {
      vi.advanceTimersByTime(2000)
    })

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('closes when the dismiss button is clicked', () => {
    const onClose = vi.fn()
    render(<Toast message="Task saved" variant="success" onClose={onClose} />)

    fireEvent.click(
      screen.getByRole('button', { name: 'Dismiss notification' }),
    )

    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
