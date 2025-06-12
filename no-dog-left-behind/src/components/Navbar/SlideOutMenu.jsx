import React from 'react';
import './slide-out-menu.css';

const SlideOutMenu = ({ isOpen, onClose }) => {
  return (
    <>
      <div className={`slideout-menu ${isOpen ? 'open' : ''}`}>
        <ul onClick={onClose}>
          <li><a href="#home">🏠 Home</a></li>
          <li><a href="#adopt">🐶 Adopt</a></li>
          <li><a href="#favorites">⭐ Favorites</a></li>
          <li><a href="#about">📖 About</a></li>
        </ul>
      </div>
      {isOpen && <div className="backdrop" onClick={onClose} />}
    </>
  );
};

export default SlideOutMenu;
