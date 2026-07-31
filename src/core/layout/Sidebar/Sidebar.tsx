import './Sidebar.css'
import SidebarItem from './SidebarItem'
import MenuIcon from '@shared/icons/MenuIcon'
import PieIcon from '@shared/icons/PieIcon'
import ProjectIcon from '@shared/icons/ProjectIcon'
import TimeIcon from '@shared/icons/TimeIcon'
import SettingsIcon from '@shared/icons/SettingsIcon'
import BurgerIcon from '@shared/icons/BurgerIcon'
import CalendarIcon from '@shared/icons/CalendarIcon'
import RavnIcon from '@shared/icons/RavnIcon'
import { useState } from 'react'

const items = [
  {
    name: 'Dashboard',
    icon: <MenuIcon />,
  },
  {
    name: 'Projects',
    icon: <ProjectIcon />,
  },
  {
    name: 'My Task',
    icon: <BurgerIcon />,
  },
  {
    name: 'Calendar',
    icon: <CalendarIcon />,
  },
  {
    name: 'Time manage',
    icon: <TimeIcon />,
  },
  {
    name: 'Reports',
    icon: <PieIcon />,
  },
  {
    name: 'Settings',
    icon: <SettingsIcon />,
  },
]

function Sidebar() {
  const [selectedButton, setSelectedButton] = useState<string>('Dashboard')

  return (
    <aside className="sidebar">
      <RavnIcon />
      {items.map(({ name, icon }) => (
        <SidebarItem
          key={name}
          name={name}
          icon={icon}
          onClick={() => setSelectedButton(name)}
          selectedName={selectedButton}
        />
      ))}
    </aside>
  )
}

export default Sidebar
