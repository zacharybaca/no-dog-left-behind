import './slide-out-menu.css';

const SlideOutMenu = ({ isOpen }) => {
  return (
    <div className={`slideout-menu ${isOpen ? 'open' : ''}`}>
      <ul>
        <li><a href="#home">🏠 Home</a></li>
        <li><a href="#adopt">🐶 Adopt</a></li>
        <li><a href="#favorites">⭐ Favorites</a></li>
        <li><a href="#about">📖 About</a></li>
      </ul>
    </div>
  );
};

export default SlideOutMenu;
