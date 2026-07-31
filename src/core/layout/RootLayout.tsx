import { Outlet } from 'react-router'
import Sidebar from './Sidebar/Sidebar'

function RootLayout() {
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default RootLayout
