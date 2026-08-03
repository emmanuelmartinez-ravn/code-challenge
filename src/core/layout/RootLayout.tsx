import { Outlet } from 'react-router'
import Sidebar from './Sidebar/Sidebar'
import './RootLayout.css'

function RootLayout() {
  return (
    <div className="layout">
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout
