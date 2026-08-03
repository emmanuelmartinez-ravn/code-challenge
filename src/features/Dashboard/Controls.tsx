import SwitchButton from '@shared/components/Buttons/SwitchButton/SwitchButton'
import BurgerIcon from '@shared/icons/BurgerIcon'
import MenuIcon from '@shared/icons/MenuIcon'
import './Controls.css'
import { useState } from 'react'
import { useSearchParams } from 'react-router'
import Button from '@shared/components/Buttons/Button/Button'
import AddIcon from '@shared/icons/AddIcon'

const views = [
  {
    name: 'list-view',
    label: 'List view',
    icon: <BurgerIcon />,
  },
  {
    name: 'cards-view',
    label: 'Cards view',
    icon: <MenuIcon />,
  },
]

function Controls() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [currentView, setCurrentView] = useState<string>(
    searchParams.get('view') ?? 'list-view',
  )

  return (
    <header className="controls">
      {views.map(({ name, label, icon }) => (
        <SwitchButton
          key={name}
          icon={icon}
          label={label}
          selected={currentView === name}
          onClick={() => {
            setSearchParams({ view: name })
            setCurrentView(name)
          }}
        />
      ))}
      <div>
        <Button label="Add task" icon={<AddIcon />} />
      </div>
    </header>
  )
}

export default Controls
