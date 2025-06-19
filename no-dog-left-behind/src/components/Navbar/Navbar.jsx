import { useState, useEffect } from 'react'
import ThemedToggleButton from './ThemedToggleButton.jsx'
import SlideOutMenu from './SlideOutMenu.jsx'
import './nav-bar.css'
import { useLocation } from 'react-router-dom'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <>
      <nav className="navbar shadow-lg p-3 mb-5 rounded">
        <div className="logo">No Dog Left Behind</div>
        <div className="toggle-image-container">
          <ThemedToggleButton menuOpen={menuOpen} onToggle={() => setMenuOpen(!menuOpen)} />
        </div>
      </nav>
      <SlideOutMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}

export default Navbar
