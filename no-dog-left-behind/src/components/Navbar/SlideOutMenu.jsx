import './slide-out-menu.css'
import Logout from '../Logout/Logout.jsx'
import DisableNotificationsToggle from '../DisableNotificationsToggle/DisableNotificationsToggle.jsx'
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
              src="/assets/dog-bones-close-icon.png"
              alt="menu close icon"
              className="menu-close-icon"
              onClick={onClose}
            />
            <DisableNotificationsToggle />
            <span className="tooltip-text">Close menu</span>
            <Logout />
          </div>
        )}

        <hr className="horizontal-ruler-default" />

        {isAuthenticated ? (
          <ul onClick={onClose}>
            <li>
              <Link to='/'> 🏠 Home </Link>
            </li>
            <li>
              <Link to='/dashboard'> 🐶 Find a Dog to Adopt </Link>
            </li>
            <li>
              <Link to='/favorites'> 💖 Favorite Dogs </Link>
            </li>
            <li>
              <Link to='/about'> 🔍 Recently Viewed Dogs </Link>
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
