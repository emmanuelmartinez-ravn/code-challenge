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
        <Button label="Search" icon={<SearchIcon />} variant={'secondary'} />

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
            variant={'secondary'}
          />
        ) : null}
        <Button
          label="Notifications"
          icon={<NotificationIcon />}
          variant={'secondary'}
        />
        <button aria-label="Profile" type="button">
          <Avatar />
        </button>
      </div>
    </header>
  )
}

export default Header
