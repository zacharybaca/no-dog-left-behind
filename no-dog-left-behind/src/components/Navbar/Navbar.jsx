import './nav-bar.css';
import ThemedToggleButton from './ThemedToggleButton.jsx';
import SlideOutMenu from './SlideOutMenu.jsx';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <nav className="navbar">
      <div className="logo">No Dog Left Behind</div>
      <ThemedToggleButton menuOpen={menuOpen} onToggle={toggleMenu} />
      <SlideOutMenu isOpen={menuOpen} />
    </nav>
  );
};

export default Navbar;
