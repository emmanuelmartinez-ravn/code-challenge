import { useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import Sidebar from './Sidebar/Sidebar'
import Header from './Header/Header'
import './RootLayout.css'

const SEARCH_DEBOUNCE_MS = 300

export type RootOutletContext = {
  search: string
}

function RootLayout() {
  const [searchValue, setSearchValue] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(searchValue)
    }, SEARCH_DEBOUNCE_MS)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [searchValue])

  const outletContext: RootOutletContext = { search: debouncedSearch }

  return (
    <div className="layout">
      <Sidebar />
      <div className="layout__content">
        <Header searchValue={searchValue} onSearchChange={setSearchValue} />
        <main>
          <Outlet context={outletContext} />
        </main>
      </div>
    </div>
  )
}

export default RootLayout
