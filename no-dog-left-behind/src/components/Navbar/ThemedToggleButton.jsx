import React, { useState } from 'react';
import { GiCat } from 'react-icons/gi';
import './themed-toggle-button.css';

const ThemedToggleButton = ({ isOpen, onToggle }) => {




    return (
        <button
            className={`themed-hamburger ${isOpen ? 'open' : ''}`}
            onClick={() => onToggle(!isOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
        >
            <img src="/assets/paw-print-menu-icon.png" alt="menu icon" />
        </button>
    );
};

export default ThemedToggleButton;
