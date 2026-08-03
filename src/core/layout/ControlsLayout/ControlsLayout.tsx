import { Outlet } from 'react-router'
import Controls from '@features/Dashboard/Controls'

function ControlsLayout() {
  return (
    <>
      <Controls />
      <Outlet />
    </>
  )
}

export default ControlsLayout
