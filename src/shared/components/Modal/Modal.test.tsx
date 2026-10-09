import { render, screen, fireEvent } from '@testing-library/react'
import Modal from './Modal'

function renderModal(onClose: () => void = () => {}) {
  return render(
    <Modal label="Edit task" onClose={onClose}>
      <button type="button">First</button>
      <button type="button">Last</button>
    </Modal>,
  )
}

describe('Modal', () => {
  it('is announced as a modal dialog with its label', () => {
    renderModal()

    expect(screen.getByRole('dialog', { name: 'Edit task' })).toHaveAttribute(
      'aria-modal',
      'true',
    )
  })

  it('moves focus to the first focusable element when it opens', () => {
    renderModal()

    expect(screen.getByRole('button', { name: 'First' })).toHaveFocus()
  })

  it('closes when Escape is pressed', () => {
    const onClose = vi.fn()
    renderModal(onClose)

    fireEvent.keyDown(document, { key: 'Escape' })

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('closes when the backdrop is pressed', () => {
    const onClose = vi.fn()
    renderModal(onClose)

    const backdrop = screen.getByRole('dialog').parentElement
    if (!backdrop) {
      throw new Error('Modal backdrop not found')
    }
    fireEvent.mouseDown(backdrop)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('stays open when its content is pressed', () => {
    const onClose = vi.fn()
    renderModal(onClose)

    fireEvent.mouseDown(screen.getByRole('button', { name: 'First' }))

    expect(onClose).not.toHaveBeenCalled()
  })

  it('wraps Tab from the last element back to the first', () => {
    renderModal()
    screen.getByRole('button', { name: 'Last' }).focus()

    fireEvent.keyDown(document, { key: 'Tab' })

    expect(screen.getByRole('button', { name: 'First' })).toHaveFocus()
  })

  it('wraps Shift+Tab from the first element back to the last', () => {
    renderModal()

    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true })

    expect(screen.getByRole('button', { name: 'Last' })).toHaveFocus()
  })

  it('returns focus to the element that opened it when it closes', () => {
    const opener = document.createElement('button')
    document.body.appendChild(opener)
    opener.focus()
    const { unmount } = renderModal()

    unmount()

    expect(opener).toHaveFocus()
    opener.remove()
  })
})
