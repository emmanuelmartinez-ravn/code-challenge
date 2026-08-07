import SearchIcon from '@shared/icons/SearchIcon'
import CancelIcon from '@shared/icons/CancelIcon'
import NotificationIcon from '@shared/icons/NotificationIcon'

import './Header.css'
import Avatar from '@shared/components/Avatar/Avatar'
import meAvatar from '@assets/me.png'
import { useRef, useState } from 'react'
import IconButton from '@shared/components/Buttons/IconButton/IconButton'

function Header() {
  const [searchValue, setSearchValue] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <header className="search-bar">
      <div>
        <IconButton label="Search" icon={<SearchIcon />} />

        <input
          type="text"
          placeholder="Search"
          id="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
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
              setSearchValue('')
            }}
          />
        ) : null}
        <IconButton label="Notifications" icon={<NotificationIcon />} />
        <button aria-label="Profile" type="button">
          <Avatar src={meAvatar} alt="Your profile" />
        </button>
      </div>
    </header>
  )
}

export default Header
