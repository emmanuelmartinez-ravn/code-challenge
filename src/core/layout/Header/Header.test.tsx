import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Header from './Header'

function renderHeader() {
  return render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <Header searchValue="" onSearchChange={() => {}} />
    </MemoryRouter>,
  )
}

describe('Header', () => {
  it('shows the search input', () => {
    renderHeader()

    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument()
  })

  it('shows the search icon button', () => {
    renderHeader()

    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument()
  })

  it('shows the notifications button', () => {
    renderHeader()

    expect(
      screen.getByRole('button', { name: 'Notifications' }),
    ).toBeInTheDocument()
  })

  it('shows the profile button', () => {
    renderHeader()

    expect(screen.getByRole('button', { name: 'Profile' })).toBeInTheDocument()
  })
})
