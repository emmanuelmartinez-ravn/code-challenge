import SwitchButton from '@shared/components/Buttons/SwitchButton/SwitchButton'
import BurgerIcon from '@shared/icons/BurgerIcon'
import MenuIcon from '@shared/icons/MenuIcon'
import './Controls.css'
import { useLocation, useNavigate } from 'react-router'
import Button from '@shared/components/Buttons/Button/Button'
import AddIcon from '@shared/icons/AddIcon'
import { useState } from 'react'
import Modal from '@shared/components/Modal/Modal'
import AddTaskForm from './AddTaskForm/AddTaskForm'

const views = [
  {
    name: 'my-task',
    label: 'My task',
    icon: <BurgerIcon />,
  },
  {
    name: 'dashboard',
    label: 'Dashboard',
    icon: <MenuIcon />,
  },
]

function Controls() {
  const navigate = useNavigate()
  const location = useLocation()

  const currentView = location.pathname.split('/')[1] ?? 'dashboard'

  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="controls">
      {views.map(({ name, label, icon }) => (
        <SwitchButton
          key={name}
          icon={icon}
          label={label}
          selected={currentView === name}
          onClick={() => {
            navigate(`../${name}`)
          }}
        />
      ))}
      <div>
        <Button
          label="Add task"
          icon={<AddIcon />}
          onClick={() => setIsOpen(true)}
        />
      </div>

      {isOpen && (
        <Modal>
          <AddTaskForm onClose={() => setIsOpen(!isOpen)} />
        </Modal>
      )}
    </header>
  )
}

export default Controls
