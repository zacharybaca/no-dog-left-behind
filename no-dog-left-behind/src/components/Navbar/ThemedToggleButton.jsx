import React, { useState } from 'react';
import { GiCat } from 'react-icons/gi';
import './themed-toggle-button.css';

const ThemedToggleButton = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleClick = () => {
        const newState = !menuOpen;
        setMenuOpen(newState);
        if (onToggle) onToggle(newState);
    };

    return (
        <button
            className={`themed-hamburger ${menuOpen ? 'open' : ''}`}
            onClick={handleClick}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
        >
            <GiCat size={26} />
        </button>
    );
};

export default ThemedToggleButton;
