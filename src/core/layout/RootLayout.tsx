import { Outlet } from 'react-router'
import Sidebar from './Sidebar/Sidebar'
import Header from './Header/Header'
import './RootLayout.css'

function RootLayout() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="layout__content">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default RootLayout
