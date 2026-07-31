import { Outlet } from 'react-router'

function RootLayout() {
  return (
    <div>
      This is the layout
      <Outlet />
    </div>
  )
}

export default RootLayout
