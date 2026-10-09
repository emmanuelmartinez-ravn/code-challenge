import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ConfirmDialog from './ConfirmDialog'

function renderConfirmDialog({
  onConfirm = () => Promise.resolve(),
  onCancel = () => {},
}: {
  onConfirm?: () => Promise<void>
  onCancel?: () => void
} = {}) {
  return render(
    <ConfirmDialog
      title="Delete task?"
      message="This task will be permanently deleted."
      confirmLabel="Delete"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />,
  )
}

describe('ConfirmDialog', () => {
  it('shows the question as a labelled dialog', () => {
    renderConfirmDialog()

    expect(
      screen.getByRole('dialog', { name: 'Delete task?' }),
    ).toHaveTextContent('This task will be permanently deleted.')
  })

  it('focuses Cancel first so the safe choice is the default', () => {
    renderConfirmDialog()

    expect(screen.getByRole('button', { name: 'Cancel' })).toHaveFocus()
  })

  it('calls onConfirm when the confirm button is clicked', () => {
    const onConfirm = vi.fn(() => Promise.resolve())
    renderConfirmDialog({ onConfirm })

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }))

    expect(onConfirm).toHaveBeenCalledTimes(1)
  })

  it('calls onCancel when Cancel is clicked', () => {
    const onCancel = vi.fn()
    renderConfirmDialog({ onCancel })

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(onCancel).toHaveBeenCalledTimes(1)
  })

  it('disables the confirm button while onConfirm is pending', async () => {
    renderConfirmDialog({ onConfirm: () => new Promise(() => {}) })

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }))

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Delete' })).toBeDisabled()
    })
  })
})
