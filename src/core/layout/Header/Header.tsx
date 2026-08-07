import SearchIcon from '@shared/icons/SearchIcon'
import CancelIcon from '@shared/icons/CancelIcon'
import NotificationIcon from '@shared/icons/NotificationIcon'

import './Header.css'
import Avatar from '@shared/components/Avatar/Avatar'
import meAvatar from '@assets/me.png'
import { useRef } from 'react'
import { useNavigate } from 'react-router'
import IconButton from '@shared/components/Buttons/IconButton/IconButton'

function Header({
  searchValue,
  onSearchChange,
}: {
  readonly searchValue: string
  readonly onSearchChange: (value: string) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  return (
    <header className="search-bar">
      <div>
        <IconButton label="Search" icon={<SearchIcon />} />

        <input
          type="text"
          placeholder="Search"
          id="search"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="body--m"
          ref={inputRef}
        />
      </div>

      <div>
        {searchValue.length > 0 ? (
          <IconButton
            label="Clear search"
            icon={<CancelIcon />}
            onClick={() => {
              inputRef.current?.focus()
              onSearchChange('')
            }}
          />
        ) : null}
        <IconButton label="Notifications" icon={<NotificationIcon />} />
        <button
          aria-label="Profile"
          type="button"
          onClick={() => navigate('/profile')}
        >
          <Avatar src={meAvatar} alt="Your profile" />
        </button>
      </div>
    </header>
  )
}

export default Header
