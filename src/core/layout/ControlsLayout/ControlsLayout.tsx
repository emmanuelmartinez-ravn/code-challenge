import { Outlet } from 'react-router'
import Controls from '@core/layout/ControlsLayout/Controls'

function ControlsLayout() {
  return (
    <>
      <Controls />
      <Outlet />
    </>
  )
}

export default ControlsLayout
