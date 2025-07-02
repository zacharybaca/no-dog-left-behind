import { useState, useEffect } from 'react';
import ThemedToggleButton from './ThemedToggleButton.jsx';
import SlideOutMenu from './SlideOutMenu.jsx';
import NotificationBell from '../NotificationBell/NotificationBell.jsx';
import { useLocation } from 'react-router-dom';
import './nav-bar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav className="navbar shadow-lg">
        <div className="notification-bell-icon-container">
          <NotificationBell />
        </div>

        <div className="logo-container">
          <img
            src="/assets/no-dog-left-behind-logo.png"
            alt="No Dog Left Behind Logo"
            className="navbar-logo"
          />
          <div className="navbar-subheading">Bringing dogs from shelters to sofas.</div>
        </div>

        <div className="themed-toggle-button-container">
          <ThemedToggleButton menuOpen={menuOpen} onToggle={() => setMenuOpen(!menuOpen)} />
        </div>
      </nav>

      <SlideOutMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default Navbar;
