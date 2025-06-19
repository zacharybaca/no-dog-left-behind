import './slide-out-menu.css'
import Logout from '../Logout/Logout.jsx';

const SlideOutMenu = ({ isOpen, onClose }) => {
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
        <ul onClick={onClose}>
          <li>
            <a href="#home">🏠 Home</a>
          </li>
          <li>
            <a href="#adopt">🐶 Adopt</a>
          </li>
          <li>
            <a href="#favorites">⭐ Favorites</a>
          </li>
          <li>
            <a href="#about">📖 About</a>
          </li>
        </ul>
      </div>
      {isOpen && <div className="backdrop" onClick={onClose} />}
    </>
  )
}

export default SlideOutMenu
