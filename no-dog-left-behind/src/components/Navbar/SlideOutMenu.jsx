import './slide-out-menu.css'
import Logout from '../Logout/Logout.jsx'
import { useAuth } from '../../hooks/useAuth.js'
import { Link } from 'react-router-dom'

const SlideOutMenu = ({ isOpen, onClose }) => {
  const { isAuthenticated } = useAuth()

  return (
    <>
      <div className={`slideout-menu ${isOpen ? 'open' : ''}`}>
        {isOpen && (
          <div id="menu-close-button-container">
            <img
              src="/assets/dog-bone-close-icon.png"
              alt="menu close icon"
              className="menu-close-icon"
              onClick={onClose}
            />
            <span className="tooltip-text">Close menu</span>
            <Logout />
          </div>
        )}
        {isAuthenticated ? (
          <ul onClick={onClose}>
            <li>
              <Link to='/'>🏠 Home</Link>
            </li>
            <li>
              <a href="#adopt">🐶 Adopt</a>
            </li>
            <li>
              <Link to='/favorites'>⭐ Favorites</Link>
            </li>
            <li>
              <Link to='/about'>📖 About</Link>
            </li>
          </ul>
        ) : <div className="menu-placeholder-container">
              <img src="/assets/paw-print-image.png" id="placeholder-image" alt="image of paw print" />
          </div>}
      </div>
      {isOpen && <div className="backdrop" onClick={onClose} />}
    </>
  )
}

export default SlideOutMenu
