import { render, screen } from '@testing-library/react'
import SidebarItem from './SidebarItem'

describe('SidebarItem', () => {
  it('shows the item name in the page', () => {
    render(<SidebarItem name="Dashboard" selected={false} />)

    expect(screen.getByText('DASHBOARD')).toBeInTheDocument()
  })
})
