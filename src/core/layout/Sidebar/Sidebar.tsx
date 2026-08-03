import './Sidebar.css'
import SidebarItem from './SidebarItem'
import RavnIcon from '@shared/icons/RavnIcon'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router'

import MenuIcon from '@shared/icons/MenuIcon'
import ProjectIcon from '@shared/icons/ProjectIcon'
import BurgerIcon from '@shared/icons/BurgerIcon'
import CalendarIcon from '@shared/icons/CalendarIcon'
import TimeIcon from '@shared/icons/TimeIcon'
import PieIcon from '@shared/icons/PieIcon'
import SettingsIcon from '@shared/icons/SettingsIcon'

const items = [
  {
    name: 'Dashboard',
    icon: <MenuIcon />,
    href: 'dashboard',
  },
  {
    name: 'Projects',
    icon: <ProjectIcon />,
    href: 'projects',
  },
  {
    name: 'My Task',
    icon: <BurgerIcon />,
    href: 'my-task',
  },
  {
    name: 'Calendar',
    icon: <CalendarIcon />,
    href: 'calendar',
  },
  {
    name: 'Time manage',
    icon: <TimeIcon />,
    href: 'time-manage',
  },
  {
    name: 'Reports',
    icon: <PieIcon />,
    href: 'reports',
  },
  {
    name: 'Settings',
    icon: <SettingsIcon />,
    href: 'settings',
  },
]

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  const [selectedButton, setSelectedButton] = useState<string>(() => {
    const route = location.pathname.split('/')[1]
    return items.find(({ href }) => href === route)?.name ?? 'Dashboard'
  })

  return (
    <aside>
      <RavnIcon />
      {items.map(({ name, icon, href }) => (
        <SidebarItem
          key={name}
          name={name}
          icon={icon}
          onClick={() => {
            setSelectedButton(name)
            navigate(href)
          }}
          active={selectedButton === name}
        />
      ))}
    </aside>
  )
}

export default Sidebar
