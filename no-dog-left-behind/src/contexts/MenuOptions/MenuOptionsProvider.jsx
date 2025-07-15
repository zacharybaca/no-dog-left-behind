import { MenuOptionsContext } from './MenuOptionsContext.jsx'
import { useState } from 'react'

export const MenuOptionsProvider = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuOptions, setMenuOptions] = useState([
    {
      endpoint: '/',
      icon: '🏠',
      title: 'Home',
    },
    {
      endpoint: '/adopt',
      icon: '🐶',
      title: 'Adopt',
    },
    {
      endpoint: '/favorites',
      icon: '⭐',
      title: 'Favorites',
    },
    {
      endpoint: '/about',
      icon: '📖',
      title: 'About',
    },
    {
      endpoint: '/admin',
      icon: '💼',
      title: 'Admin',
    },
  ])

  return (
    <MenuOptionsContext.Provider
      value={{
        menuOptions,
        menuOpen,
        setMenuOptions,
        setMenuOpen
      }}
    >
      {children}
    </MenuOptionsContext.Provider>
  )
}
