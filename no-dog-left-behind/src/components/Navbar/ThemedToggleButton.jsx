import './themed-toggle-button.css';

const ThemedToggleButton = ({ menuOpen, onToggle }) => {
  return (
    <button
      className={`themed-hamburger ${menuOpen ? 'open' : ''}`}
      onClick={onToggle}
      aria-label="Toggle navigation menu"
      aria-expanded={menuOpen}
    >
      <div className="bar bar1" />
      <div className="bar bar2" />
      <div className="bar bar3" />
    </button>
  );
};

export default ThemedToggleButton;
