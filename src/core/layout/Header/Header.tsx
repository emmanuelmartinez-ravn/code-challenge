import SearchIcon from '@shared/icons/SearchIcon'
import CancelIcon from '@shared/icons/CancelIcon'
import NotificationIcon from '@shared/icons/NotificationIcon'

import './Header.css'
import Avatar from '@shared/Avatar/Avatar'
import { useState } from 'react'

function Header() {
  const [searchValue, setSearchValue] = useState<string>('')
  return (
    <header>
      <div>
        <button className="icon-button">
          <SearchIcon />
        </button>

        <input
          type="text"
          placeholder="Search"
          id="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      <div>
        {searchValue.length > 0 ? (
          <button className="icon-button" onClick={() => setSearchValue('')}>
            <CancelIcon />{' '}
          </button>
        ) : null}
        <button className="icon-button">
          <NotificationIcon />
        </button>
        <Avatar />
      </div>
    </header>
  )
}

export default Header
