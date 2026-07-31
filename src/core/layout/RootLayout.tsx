import { Outlet } from 'react-router'
import SidebarItem from './Sidebar/SidebarItem'

function RootLayout() {
  return (
    <div>
      <SidebarItem />
      <Outlet />
    </div>
  )
}

export default RootLayout
