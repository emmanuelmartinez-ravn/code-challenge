import SearchIcon from '@shared/icons/SearchIcon'
import CancelIcon from '@shared/icons/CancelIcon'
import NotificationIcon from '@shared/icons/NotificationIcon'

import './Header.css'
import Avatar from '@shared/components/Avatar/Avatar'
import { useRef, useState } from 'react'
import Button from '@shared/components/Buttons/Button/Button'

function Header() {
  const [searchValue, setSearchValue] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <header className="search-bar">
      <div>
        <Button label="Search" icon={<SearchIcon />} ghost={true} />

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
          <Button
            label="Clear search"
            icon={<CancelIcon />}
            onClick={() => {
              inputRef.current?.focus()
              setSearchValue('')
            }}
            ghost={true}
          />
        ) : null}
        <Button
          label="Notifications"
          icon={<NotificationIcon />}
          ghost={true}
        />
        <button aria-label="Profile">
          <Avatar />
        </button>
      </div>
    </header>
  )
}

export default Header
